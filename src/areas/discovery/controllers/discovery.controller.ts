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
    const searchKeyword = req.query.query.toString();
    const users = this.discoveryService.filterUsers(searchKeyword);
    const posts = this.discoveryService.fitlerPosts(searchKeyword);
    const postResults = [];

    if (posts) {
      posts.forEach(post => {
        const author = this.discoveryService.getUserByUsername(post.userId);
        postResults.push({ post: post, author: author });
      });
    }

    res.render("discovery/views/search", { postResults, users });
  };

}

export default DiscoveryController;
