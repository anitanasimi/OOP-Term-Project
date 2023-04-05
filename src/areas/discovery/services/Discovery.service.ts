import { Prisma, PrismaClient } from "@prisma/client";
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
        },
        include: {
          followers: true,
          followed: true,
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
        include: {
          followers: true,
          followed: true
        }
      })

      return (users ? users : null)

    } catch {
      throw new Error("filterUsers has failed to function");
    }
  }

  async addToFollowed(followerId: string, accountToFollowId: string) {
    try {
      await this.prisma.account.update({
        where: { id: followerId },
        data: {
          followed: {
            connect: {
              id: accountToFollowId
            }
          }
        }
      });
    } catch {
      throw new Error("addToFollowed has failed to function");
    }
  }

  async removeFromFollowed(followerId: string, accountToFollowId: string) {
    try {
      await this.prisma.account.update({
        where: { id: followerId },
        data: {
          followed: {
            disconnect: {
              id: accountToFollowId
            }
          }
        }
      });
    } catch {
      throw new Error("addToFollowers has failed to function");
    }
  }

  async addToFollowers(followedAccountId: string, followerId: string) {
    try {
      await this.prisma.account.update({
        where: { id: followedAccountId },
        data: {
          followers: {
            connect: {
              id: followerId
            }
          }
        }
      });
    } catch {
      throw new Error("addToFollowers has failed to function");
    }
  }

  async removeFromFollowers(followedAccountId: string, followerId: string) {
    try {
      await this.prisma.account.update({
        where: { id: followedAccountId },
        data: {
          followers: {
            disconnect: {
              id: followerId
            }
          }
        }
      });
    } catch {
      throw new Error("addToFollowers has failed to function");
    }
  }

  async follow(loggedInUser: IUser, targetUser: IUser) {
    try {
      await this.addToFollowed(loggedInUser.id, targetUser.id)
      await this.addToFollowers(targetUser.id, loggedInUser.id)
    } catch {

      throw new Error("follow has failed to function");
    }
  }

  unfollow(user: IUser, target: IUser) {
    throw new Error("unfollow has failed to function");
  }
}