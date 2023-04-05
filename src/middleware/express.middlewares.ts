import express, { NextFunction } from "express";
import path from "path";
import session from "express-session";
import morgan from "morgan";

const fs = require('fs');

//const Redis = require("ioredis");

const redis = require('redis');
const connectRedis = require('connect-redis');

require('dotenv').config();

const RedisStore = connectRedis(session);

const redisClient = redis.createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    username: "default",
    password: process.env.REDIS_PASSWORD,
    db: 0,
})

redisClient.on('error', function (err) {
  console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
  console.log('Connected to redis successfully');
});


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
      store: new RedisStore({client: redisClient}),
      secret: "secret",
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
