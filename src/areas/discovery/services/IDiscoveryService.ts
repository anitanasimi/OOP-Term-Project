import IPost from "../../../interfaces/post.interface";
import IUser from "../../../interfaces/user.interface";

export default interface IDiscoveryService {
  fitlerPosts(keyword: string): IPost[];

  filterUsers(keyword: string): IUser[];
}