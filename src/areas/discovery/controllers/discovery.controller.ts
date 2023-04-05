import { Request, Response, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IDiscoveryService from "../services/IDiscoveryService";
import IUser from "../../../interfaces/user.interface";

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
    this.router.get(`${this.path}user/:id/unfollow`, this.unfollow);
  }

  private search = async (req: Request, res: Response) => {
    const url = await req.url
    this.setRecentUrl(url)

    let loggedInUser = await req.user as IUser
    loggedInUser = await this.discoveryService.getUserByUserId(loggedInUser.id)

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

    const lastSearchPageUrl = this.getRecentUrl()
    res.redirect(lastSearchPageUrl)
  }

  private unfollow = async (req: Request, res: Response) => {
    const loggedInUser = await req.user as IUser
    const accountToUnfollowId = await req.params.id

    await this.discoveryService.removeFromFollowed(loggedInUser.id, accountToUnfollowId)
    await this.discoveryService.removeFromFollowers(accountToUnfollowId, loggedInUser.id)

    const lastSearchPageUrl = this.getRecentUrl()
    res.redirect(lastSearchPageUrl)
  }

  private setRecentUrl = (url) => {
    this.url = url
  }

  private getRecentUrl = () => {
    return this.url
  }
}

export default DiscoveryController;
