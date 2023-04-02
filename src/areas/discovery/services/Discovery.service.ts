import IPost from "../../../interfaces/post.interface";
import IDiscoveryService from "./IDiscoveryService";

export default class DiscoveryService implements IDiscoveryService {
  fitlerPosts(keyword: string): IPost[] {
    throw new Error("Method not implemented.");
  }
}