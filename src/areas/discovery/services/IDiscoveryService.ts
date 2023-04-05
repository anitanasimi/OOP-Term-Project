import IPost from "../../../interfaces/post.interface";
import IUser from "../../../interfaces/user.interface";

export default interface IDiscoveryService {
  getUserByUserId(username: string): Promise<IUser>

  getPostAuthor(post: IPost): Promise<string>

  fitlerPosts(keyword: string): Promise<{post: IPost, author: string}[]>;

  filterUsers(keyword: string): Promise<IUser[]>;

  follow(user: IUser, target: IUser)

  unfollow(user: IUser, target: IUser)
}