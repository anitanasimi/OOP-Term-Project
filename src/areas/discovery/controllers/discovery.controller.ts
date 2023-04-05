import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IDiscoveryService from "../services/IDiscoveryService";
import IUser from "../../../interfaces/user.interface";
import { database, post, posts } from "../../../model/fakeDB";

class DiscoveryController implements IController {
  public path = "/";
  public router = Router();
  private discoveryService: IDiscoveryService;
  private url: string

  constructor(discoveryService: IDiscoveryService) {
    this.initializeRoutes();
    this.discoveryService = discoveryService
  }

  private initializeRoutes() {
    this.router.get(`${this.path}search`, this.search);
    this.router.get(`${this.path}user/:id/follow`, this.follow);
    // this.router.get(`${this.path}user/:id/unfollow`, this.unfollow);
  }

  private search = async (req: Request, res: Response) => {
    const url = await req.url
    this.setRecentUrl(url)

    let loggedInUser = await req.user as IUser
    loggedInUser = await this.discoveryService.getUserByUserId(loggedInUser.id)
    // console.log("followed:")
    // console.log(loggedInUser.followed)
    // const loggedInUserFollowedList = loggedInUser.followed

    const searchKeyword = req.query.query.toString();

    const posts = await this.discoveryService.fitlerPosts(searchKeyword);
    const users = await this.discoveryService.filterUsers(searchKeyword);

    console.log("rendering new page")
    res.render("discovery/views/searchTest", { posts, users, loggedInUser });
  };

  private follow = async (req: Request, res: Response) => {
    const loggedInUser = await req.user as IUser
    const accountToFollowId = await req.params.id

    await this.discoveryService.addToFollowed(loggedInUser.id, accountToFollowId)
    await this.discoveryService.addToFollowers(accountToFollowId, loggedInUser.id)

    res.redirect("/posts")
  }

  private setRecentUrl = (url) => {
    this.url = url
  }

  private getRecentUrl = () => {
    return this.url
  }

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
