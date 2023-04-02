import IPost from "../../../interfaces/post.interface";
import IUser from "../../../interfaces/user.interface";
import IDiscoveryService from "./IDiscoveryService";
import { database } from "../../../model/fakeDB";

export default class MockDiscoveryService implements IDiscoveryService {
  fitlerPosts(keyword: string): IPost[] {
    try {
      const foundPosts = [];
      for (const user of database.users) {
        for (const post of user.posts) {
          if (post.message.toLocaleLowerCase().includes(keyword)) {
            foundPosts.push(post);
          }
        }
      }
      return foundPosts;
    } catch {
      throw new Error("Error connection to database");
    }
  }

  filterUsers(keyword: string): IUser[] {
    try {
      const foundUsers = [];
      for (const user of database.users) {
        if (
          user.firstName.toLocaleLowerCase().includes(keyword) ||
          user.lastName.toLocaleLowerCase().includes(keyword) ||
          user.username.toLocaleLowerCase().includes(keyword)
        ) {
          foundUsers.push(user);
        }
      }
      return foundUsers;
    } catch {
      throw new Error("Error connection to database");
    }
  }
}