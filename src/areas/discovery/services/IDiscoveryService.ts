import IPost from "../../../interfaces/post.interface";

export default interface IDiscoveryService {
  fitlerPosts(keyword: string): IPost[]
}