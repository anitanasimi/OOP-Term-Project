import passport from "passport";
import { Application } from "express";
import PassportConfig from "../areas/authentication/config/PassportConfig";

import passportLocalStrategy from "C:/Users/melch/Documents/Programming/COMP 2523/OOP-Term-Project/src/areas/authentication/passportStrategies/localStrategy";

const passportConfig = new PassportConfig([passportLocalStrategy]);

module.exports = (app: Application) => {
  app.use(passport.initialize());
  app.use(passport.session());
  // Use PassportConfig class here
};
