import IPost from "../../../interfaces/post.interface";
import IUser from "../../../interfaces/user.interface";
import { UserViewModel } from "../views/UserViewModel";

export default interface IDiscoveryService {
  getUserByUsername(username: string): UserViewModel

  fitlerPosts(keyword: string): IPost[];

  filterUsers(keyword: string): IUser[];
}