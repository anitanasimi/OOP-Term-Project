import IPost from "../../../interfaces/post.interface";
import IUser from "../../../interfaces/user.interface";
import { UserViewModel } from "../views/UserViewModel";
import IDiscoveryService from "./IDiscoveryService";

export default class DiscoveryService implements IDiscoveryService {
  getUserByUserId(username: string): IUser {
  throw new Error("Method not implemented.");
  }

  fitlerPosts(keyword: string): IPost[] {
    throw new Error("Method not implemented.");
  }
  filterUsers(keyword: string): IUser[] {
    throw new Error("Method not implemented.");
  }

  follow(user: IUser, target: IUser) {
    throw new Error("Method not implemented.");
  }
}