const express = require("express");
const app = express();
var jwt = require("jsonwebtoken");
const mysql = require("mysql");
var cors = require("cors");
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "login_users",
});

app.use("/signup", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email === "" || password === "") {
    res.send({
      message: "Empty or Incomplete Details!",
    });
  } else {
    db.query(
      " INSERT INTO users ( email, password) VALUES (? ,? ) ", //SQL Query
      [email, password],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        if (result) {
          res.send({
            message: "Signup Successful!",
          });
        }
      }
    );
  }
});

app.use("/login", (req, res) => {
  const emailLogin = req.body.email;
  const passwordLogin = req.body.password;

  if (emailLogin === "" || passwordLogin === "") {
    res.send({
      message: "Invalid Input :(",
    }); 
  }
  
  
 if(emailLogin.includes(".com")) {
    db.query(
      " SELECT * FROM users WHERE email = ? AND password = ? ", //SQL query
      [emailLogin, passwordLogin],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }

        if (result.length > 0) {
          jwt.sign({ passwordLogin }, "secretkey",{ expiresIn: '4h'} ,(err, token) => {
           
            res.send({
              email: emailLogin,
              password: token,
            });
          });

          // res.send(result);
        } else {
          res.send({
            message: "Invalid Password",
          });
        }
      }
    );
  }

  else{

    res.send({

      message: "Invalid Email"
    })
  }



});

app.listen(3001);
