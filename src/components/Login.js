import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { isJwtExpired } from "jwt-check-expiration";

function Login() {
  const nav = useNavigate(); //navigation

  //Hooks
  var [User, setUser] = useState({
    email: "",
    password: "",
  });

  var [loginStatus, setLoginstatus] = useState("");

  //session maintainer
  useEffect(() => {
    const checkerMail = localStorage.getItem("Email");

    if (checkerMail && expiryChecker() === false) {
      nav("/after");
    } else {
      localStorage.clear();
    }
  });

  const expiryChecker = () => {
    return isJwtExpired(localStorage.getItem("Password"));
  };

  //Requesting Backend
  const register = () => {
    axios
      .post("http://localhost:3001/login", {
        email: User.email,
        password: User.password,
      })
      .then((response) => {
        if (response.data.message) {
          setLoginstatus(response.data.message);
        } else {
          setLoginstatus(response.data.email);

          // console.log('isExpired is:', isJwtExpired(response.data.password));
          setData(response.data.email, response.data.password);
          Redirector();
        }
      });
  };

  // Storing data in session
  function setData(email, password) {
    localStorage.setItem("Email", email); //storing email in session
    localStorage.setItem("Password", password); //storing password in session
  }

  function Redirector() {
    nav("/after ");
  }

  const submitHandler = (e) => {
    e.preventDefault();

    register();

    // console.log(User);
  };

  return (
    <div>
      <div className="wrapper">
        <Alert
          key={loginStatus === "" ? "" : "danger"}
          variant={loginStatus === "" ? "" : "danger"}
        >
          {loginStatus}
        </Alert>

        <h2>Login</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setUser({ ...User, email: e.target.value })}
              value={User.email}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setUser({ ...User, password: e.target.value })}
              value={User.password}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" type="submit">
              Login
            </Button>
          </div>

          {/* Linking to the signup page */}
          <Link to="/signup">Don't have an account?</Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
