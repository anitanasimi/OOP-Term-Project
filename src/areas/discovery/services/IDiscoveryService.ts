import IPost from "../../../interfaces/post.interface";
import IUser from "../../../interfaces/user.interface";
import { UserViewModel } from "../views/UserViewModel";

export default interface IDiscoveryService {
  getUserByUserId(username: string): IUser

  fitlerPosts(keyword: string): IPost[];

  filterUsers(keyword: string): IUser[];

  follow(user: IUser, target: IUser)
}