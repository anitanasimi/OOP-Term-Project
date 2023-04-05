import { PrismaClient } from "@prisma/client";
import IPost from "../../../interfaces/post.interface";
import IUser from "../../../interfaces/user.interface";
import IDiscoveryService from "./IDiscoveryService";

export default class DiscoveryService implements IDiscoveryService {
  public prisma = new PrismaClient();


  async getUserByUserId(id: string): Promise<IUser> {
    try {
      const user = await this.prisma.account.findUnique({
        where: {
          id: id
        }
      })
      return (user ? user : null)
    } catch {
      throw new Error("Method not implemented.");
    }
  }

  async getPostAuthor(post: IPost): Promise<string> {
    try {
      const author = await this.getUserByUserId(post.authorId)
      const authorName = `${author.first_name} ${author.last_name}`
      return authorName
    } catch {
      throw new Error("getPostAuthor failed to function");
    }
  }

  async fitlerPosts(keyword: string): Promise<{ post: IPost, author: string }[]> {
    try {
      const posts = await this.prisma.tweet.findMany({
        where: {
          description: {
            contains: keyword,
          },
        },
      })

      const postsAndAuthors = []
      for (const post of posts) {
        const author = await this.getPostAuthor(post)
        postsAndAuthors.push({ post, author })
      }

      return (postsAndAuthors ? postsAndAuthors : null)

    } catch {
      throw new Error("filterPosts has failed to function");
    }
  }

  async filterUsers(keyword: string): Promise<IUser[]> {
    try {
      const users = await this.prisma.account.findMany({
        where: {
          OR: [
            { first_name: { contains: keyword } },
            { last_name: { contains: keyword } }
          ]
        },
      })

      return (users ? users : null)

    } catch {
      throw new Error("filterUsers has failed to function");
    }
  }

  follow(user: IUser, target: IUser) {
    throw new Error("Method not implemented.");
  }

  unfollow(user: IUser, target: IUser) {
    throw new Error("Method not implemented.");
  }
}