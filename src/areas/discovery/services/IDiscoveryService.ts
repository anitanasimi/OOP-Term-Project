import IPost from "../../../interfaces/post.interface";
import IUser from "../../../interfaces/user.interface";

export default interface IDiscoveryService {
  getUserByUserId(id: string): Promise<IUser>

  getPostAuthor(post: IPost): Promise<string>

  fitlerPosts(keyword: string): Promise<{ post: IPost, author: string }[]>;

  filterUsers(keyword: string): Promise<IUser[]>;

  addToFollowed(followerId: string, accountToFollowId: string)

  removeFromFollowed(followerId: string, accountToFollowId: string)

  addToFollowers(followedAccountId: string, followerId: string)

  removeFromFollowers(followerId: string, accountToFollowId: string)

  follow(user: IUser, target: IUser)

  unfollow(user: IUser, target: IUser)
}