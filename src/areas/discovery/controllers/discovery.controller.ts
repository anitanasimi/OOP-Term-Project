import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IDiscoveryService from "../services/IDiscoveryService";
import { database, post, posts } from "../../../model/fakeDB";

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
    // this.router.get(`${this.path}user/:id/follow`, this.follow);
    // this.router.get(`${this.path}user/:id/unfollow`, this.unfollow);
  }

  private search = async (req: Request, res: Response) => {
    const searchKeyword = req.query.query.toString();
    // const users = this.discoveryService.filterUsers(searchKeyword);
    const posts = await this.discoveryService.fitlerPosts(searchKeyword);
    const users = await this.discoveryService.filterUsers(searchKeyword);

    // res.render("discovery/views/search", { postResults, users, loggedInUser });
    console.log("rendering new page")
    res.render("discovery/views/searchTest", { posts });
  };

  // private follow = (req: Request, res: Response) => {
  //   const follower = loggedInUser
  //   const targetUser = this.discoveryService.getUserByUserId(req.params.id)
  //   if (!follower.following.includes(targetUser.username)) {
  //     follower.following.push(targetUser.username)
  //   }
  //   res.redirect("/posts")
  // }

  // private unfollow = (req: Request, res: Response) => {
  //   const follower = loggedInUser
  //   const targetUser = this.discoveryService.getUserByUserId(req.params.id)
  //   if (follower.following.includes(targetUser.username)) {
  //     const index = follower.following.indexOf(targetUser.username)
  //     follower.following.splice(index, 1)
  //   }
  //   res.redirect("/posts")
  // }

}

export default DiscoveryController;
