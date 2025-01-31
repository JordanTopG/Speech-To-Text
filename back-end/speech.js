const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SpeechClient } = require("@google-cloud/speech");
const { user } = require("./models/user");
const { mongoose } = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

module.exports = (app) => {
  //compare the hash password with the password during the login phase
  async function compareHashedPasswords(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  app.post("/login", async (req, res, next) => {
    const { body } = req;
    const { username } = body;
    const { password } = body;

    if (username === user.email && password === user.password) {
      //if user log in successful, it generates a jwt token for the user with a secret key
      jwt.sign({ user }, "privatekey", { expiresIn: "1d" }, (err, token) => {
        if (err) {
          console.log(err);
        }
        res.send(token);
      });
    } else {
      console.log("ERROR: Could not log in");
    }
  });

  const isMatch = compareHashedPasswords(user.password, hashPassword);

  if (isMatch) {
    //Protected route
    app.get("/user/data", checkToken, (req, res) => {
      //If verified then a JWT token is generated for the user
      jwt.verify(req.token, "privatekey", (err, authorizedData) => {
        if (err) {
          //If error send Forbidden (403)
          console.log("ERROR: Could not connect to the protected route");
          res.sendStatus(403);
        } else {
          //If token is successfully verified, sends authorised data
          res.json({
            message: "Successfully logged in",
            authorizedData,
          });
          console.log("SUCCESS: Connected to protected route");
        }
      });
    });
  }

  //encrypt the password called when user signs up

  async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  app.post("/sign-up", async (req, res, next) => {
    const { firstname, surname, dob, email, address, password } = req.body;

    if (err) {
      console.log("ERROR: All fields are required.");
      res.status(400);
    }
    //checks if user email is already in use
    try {
      const existingUser = await user.findOne({ where: { email } });
      if (existingUser) {
        console.log("ERROR: Email already in use.");
        res.status(403);
      }
      const hashedPassword = await hashPassword(password);
      //save user data to databse
      const user = await user.create({
        firstname,
        surname,
        dob,
        email,
        address,
        password: hashedPassword,
      });
      //jwt token created for 'new' user
      jwt.sign({ user }, "privatekey", { expiresIn: "1d" }, (err, token) => {
        if (err) {
          console.log(err);
        }
        res.send(token);
      });
    } catch (err) {
      console.log("ERROR: Could not sign in");
    }
    res.status(201).json({
      message: "User successfully registered. ",
    });
  });
};

//speech API

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
