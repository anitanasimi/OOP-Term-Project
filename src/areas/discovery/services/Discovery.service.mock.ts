import IPost from "../../../interfaces/post.interface";
import IDiscoveryService from "./IDiscoveryService";
import { database } from "../../../model/fakeDB";

export default class MockDiscoveryService implements IDiscoveryService {
  fitlerPosts(keyword: string): IPost[] {
    try {
      const foundPosts = [];
      for (const user of database.users) {
        for (const post of user.posts) {
          if (post.message.includes(keyword)) {
            foundPosts.push(post);
          }
        }
      }
      return foundPosts;
    } catch {
      throw new Error("Method not implemented.");
    }
  }
}