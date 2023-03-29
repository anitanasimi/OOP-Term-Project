import express from "express";
import path from "path";
import session from "express-session";
import morgan from "morgan";
import RedisStore from "connect-redis";
// import {createClient} from "redis";
const Redis = require("ioredis");
require('dotenv').config();

const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  username: "default",
  password: process.env.REDIS_PASSWORD,
  db: 0,
})


module.exports = (app) => {
  // Static File Serving and Post Body Parsing
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: true }));
  app.set("views", path.join(__dirname, "..", "areas"));
  app.set("view engine", "ejs");

  // Logging Middleware
  app.use(morgan("tiny"));

  // Session Configuration
  app.use(
    session({
      secret: "secret",
      //store: redis,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );
};
