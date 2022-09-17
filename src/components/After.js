import React, { Component, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import "./after.css";


function After() {
  const nav = useNavigate(); //navigation
  const mail = localStorage.getItem("Email");

  function handleSubmit() {
    localStorage.clear();
    nav("/login");
  }

  //using session to verify that user cant get access to this page without logging in
  useEffect(() => {
    const prevData = localStorage.getItem("Email");
    if (prevData == null) {
      handleSubmit();
    }
  });

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Welcome to the Dashboard </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">{mail}</a>
            </Navbar.Text>
            <Button className="Logout" variant="danger" onClick={handleSubmit}>
              Log Out
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </div>
  );
}

export default After;
