import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const nav = useNavigate(); //navigation
  
  var [userNew, setUserNew] = useState({
    newEmail: "",
    newPassword: "",
  });

  var [regStatus, setRegStatus] = useState("");
  var [confirmPass, setConfirmPass] = useState("");

  const register = () => {
    axios
      .post("http://localhost:3001/signup", {
        email: userNew.newEmail,
        password: userNew.newPassword,
      })
      .then((response) => {
        setRegStatus(response.data.message);

        console.log(response);
        if (response.data.message === "Signup Successful!") {
          setTimeout(() => {
            nav("/login");
          }, 2000);
        }
      });

    //redirecting to login page after successfull sign up
  };

  const confirmPassword = (x) => {
    if (x !== userNew.newPassword) {
      setRegStatus("Password does not match");
      return 1;
    } else {
      setRegStatus("");
    }
  };


  const submitHandler = (e) => {
    e.preventDefault();

    if (confirmPassword(confirmPass) === 1) {
      return regStatus;
    }

    if (userNew.newEmail.includes(".com")) {
      register();
    } else {
      setRegStatus("Can not proceed! Please enter a valid email.");
    }

  };

  return (
    <div>
      <div className="wrapper">
        <Alert key={regStatus === "" ? "" : "danger"} variant={regStatus === "" ? "" : "danger"}  >
          {regStatus}
        </Alert>

        <h2>Sign Up</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              onChange={(e) =>
                setUserNew({ ...userNew, newEmail: e.target.value })
              }
              value={userNew.newEmail}
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
              onChange={(e) =>
                setUserNew({ ...userNew, newPassword: e.target.value })
              }
              value={userNew.newPassword}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label> Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPass(e.target.value)}
              // value={}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="success" size="lg" type="submit">
              Sign Up
            </Button>
          </div>

          {/* Linking to the login page */}

          <Link to="/login">Already have an account?</Link>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
