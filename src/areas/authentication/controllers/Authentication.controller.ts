import express from "express";
import IUser from "../../../interfaces/user.interface";
import IController from "../../../interfaces/controller.interface";
import { IAuthenticationService } from "../services";
const passport = require('passport');

class AuthenticationController implements IController {
  public path = "/auth";
  public router = express.Router();
  public service;

  constructor(service: IAuthenticationService) {
    this.initializeRoutes();
    this.service = service;
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/register`, this.showRegistrationPage);
    this.router.post(`${this.path}/register`, this.registration);
    this.router.get(`${this.path}/login`, this.showLoginPage);
    this.router.post(`${this.path}/login`, this.login);
    this.router.post(`${this.path}/logout`, this.logout);
  }

  private showLoginPage = (_: express.Request, res: express.Response) => {
    res.render("authentication/views/login");
  };

  private showRegistrationPage = (_: express.Request, res: express.Response) => {
    res.render("authentication/views/register");
  };

  // 🔑 These Authentication methods needs to be implemented by you
  private login = async (req: express.Request, res: express.Response) => {
    console.log(req.body);
    // // res.redirect(`${this.path}/login`);
    // const user = await this.service.getUserByEmailAndPassword(req.body.email, req.body.password);
    // console.log(user);
    // if(user) {
    //   console.log("logged in");
    //   res.redirect("/auth/login");
    // } else {
    //   console.log("failed log in");
    //   res.redirect("/auth/login");
    // }

    passport.authenticate("local", {
      successRedirect: "/auth/login",
      failureRedirect: "/auth/register",
      failureMessage: true,
      //can get that message from req.session.messages
      //typescript doesn't recognize .messages though, so you need to do something like...
      //(req.session as any).messages
  
    })
  };
  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.body);

    const newUser: IUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
    }

    const successfulRegistration = await this.service.createUser(newUser);

    if(successfulRegistration) {
      console.log("user signed up")
      res.redirect("/auth/login");
    } else {
      console.log("registration fail")
      res.redirect("/auth/register");
    }

  };
  private logout = async (req: express.Request, res: express.Response) => {};
}

export default AuthenticationController;
