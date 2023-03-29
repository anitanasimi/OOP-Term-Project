import passport from "passport";
import { Application } from "express";
import PassportConfig from "../areas/authentication/config/PassportConfig";

import passportLocalStrategy from "../areas/authentication/passportStrategies/localStrategy";

new PassportConfig([passportLocalStrategy]);

module.exports = (app: Application) => {
  app.use(passport.initialize());
  app.use(passport.session());
  // Use PassportConfig class here
};
