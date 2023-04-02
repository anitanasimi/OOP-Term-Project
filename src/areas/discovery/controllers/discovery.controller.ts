import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IDiscoveryService from "../services/IDiscoveryService";
import { post, posts } from "../../../model/fakeDB";

class DiscoveryController implements IController {
  public path = "/search";
  public router = Router();

  constructor(postService: IDiscoveryService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.filterPosts);
  }

  private filterPosts = (_: Request, res: Response) => {
    res.render("discovery/views/search", { posts });
  };

}

export default DiscoveryController;
