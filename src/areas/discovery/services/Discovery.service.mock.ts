import IPost from "../../../interfaces/post.interface";
import IDiscoveryService from "./IDiscoveryService";

export default class MockDiscoveryService implements IDiscoveryService {
  fitlerPosts(keyword: string): IPost[] {
  throw new Error("Method not implemented.");
  }
}