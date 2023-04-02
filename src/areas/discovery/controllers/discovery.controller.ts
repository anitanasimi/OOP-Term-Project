import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IDiscoveryService from "../services/IDiscoveryService";
import { database, post, posts } from "../../../model/fakeDB";

const loggedInUser = database.users[0]

class DiscoveryController implements IController {
  public path = "/";
  public router = Router();
  private discoveryService: IDiscoveryService;

  constructor(discoveryService: IDiscoveryService) {
    this.initializeRoutes();
    this.discoveryService = discoveryService
  }

  private initializeRoutes() {
    this.router.get(`${this.path}search`, this.search);
    this.router.get(`${this.path}user/:id/follow`, this.follow);
    // this.router.get(`${this.path}search`, this.search);
  }

  private search = (req: Request, res: Response) => {
    const searchKeyword = req.query.query.toString();
    const users = this.discoveryService.filterUsers(searchKeyword);
    const posts = this.discoveryService.fitlerPosts(searchKeyword);
    const postResults = [];

    if (posts) {
      posts.forEach(post => {
        const author = this.discoveryService.getUserByUserId(post.userId);
        postResults.push({ post: post, author: author });
      });
    }
    res.render("discovery/views/search", { postResults, users, loggedInUser });
  };

  private follow = (req: Request, res: Response) => {
    const user = loggedInUser
    const target = this.discoveryService.getUserByUserId(req.params.id)
    user.following.push(target.username)
    res.redirect("/posts")
  }

}

export default DiscoveryController;
