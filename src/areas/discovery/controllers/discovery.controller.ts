import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IDiscoveryService from "../services/IDiscoveryService";
import { post, posts } from "../../../model/fakeDB";

class DiscoveryController implements IController {
  public path = "/search";
  public router = Router();
  private discoveryService: IDiscoveryService;

  constructor(discoveryService: IDiscoveryService) {
    this.initializeRoutes();
    this.discoveryService = discoveryService
  }

  private initializeRoutes() {
    this.router.get(this.path, this.search);
  }

  private search = (req: Request, res: Response) => {
    const searchKeyword = req.query.query.toString()
    console.log("finding posts with " + searchKeyword)
    const posts = this.discoveryService.fitlerPosts(searchKeyword)
    console.log("here's what I found:")
    console.log(posts)
    res.render("discovery/views/search", { posts, });
  };

}

export default DiscoveryController;
