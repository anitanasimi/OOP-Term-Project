import IPost from "../../../interfaces/post.interface";
import IUser from "../../../interfaces/user.interface";
import IDiscoveryService from "./IDiscoveryService";
import { UserViewModel } from "../views/UserViewModel"
import { database } from "../../../model/fakeDB";

export default class MockDiscoveryService implements IDiscoveryService {
  getUserByUsername(username: string): UserViewModel {
    try {
      for (const user of database.users) {
        if (user.username == username) {
          let foundUser = new UserViewModel(user)
          return foundUser
        }
      }
    }
    catch { throw new Error("Error connecting to database") };
  }

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
      throw new Error("Error connecting to database");
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
          let foundUser = new UserViewModel(user)
          foundUsers.push(foundUser);
        }
      }
      return foundUsers;
    } catch {
      throw new Error("Error connecting to database");
    }
  }
}