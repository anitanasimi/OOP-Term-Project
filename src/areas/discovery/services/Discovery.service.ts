import IPost from "../../../interfaces/post.interface";
import IUser from "../../../interfaces/user.interface";
import IDiscoveryService from "./IDiscoveryService";

export default class DiscoveryService implements IDiscoveryService {
  fitlerPosts(keyword: string): IPost[] {
    throw new Error("Method not implemented.");
  }
  filterUsers(keyword: string): IUser[] {
    throw new Error("Method not implemented.");
  }
}