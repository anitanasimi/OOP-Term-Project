import express from "express";
import IController from "../../../interfaces/controller.interface";
import { PrismaClient } from '@prisma/client'

class LandingController implements IController {
  public path = "/";
  public router = express.Router();
  public prisma = new PrismaClient();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.showLandingPage);

    this.router.get(`${this.path}/testing`, async (req, res) => {
      try {
        // const newUser = await this.prisma.account.create({
        //   data: {
        //     username: "borners",
        //     password: "kahahaha",
        //     first_name: "Bobby",
        //     last_name: "Corners",
        //     email: "awb@msn.ca"
        //   },
        // })
        const users = await this.prisma.account.findMany();
        console.log("wat");
        res.json(users);
    } catch (error) {
        // Status Code 500 - Server/Database-Level Error
        res.status(500).json({Error: "Something went wrong."});
    }
    })
  }

  private showLandingPage = (_: express.Request, res: express.Response) => {
    res.render("landing/views/index");
  };
}

export default LandingController;
