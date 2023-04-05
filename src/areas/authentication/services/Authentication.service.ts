import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";
import { PrismaClient } from '@prisma/client'
const bcrypt = require('bcrypt');

const saltRounds = 10;

// ❗️ Implement this class much later, once everything works fine with your mock db
export class AuthenticationService implements IAuthenticationService {
  // ⭐️ _db should be a reference to your real database driver
  readonly _db: any;
  public prisma = new PrismaClient();

  async findUserByEmail(email: string): Promise<IUser | boolean>{
    // 🚀 Talk to your real database here
    try {
      const user = await this.prisma.account.findUnique({
        where: {
          email: email,
        },
      })
      if (user) {
        // console.log(user);
        return user;
      } else {
        return false
      }
      
    }
    catch {
      throw new Error("findUnique has failed to function.");
    }
    
  }
  async getUserByEmailAndPassword(email: string, password: string): Promise<IUser | boolean> {
    // 🚀 Talk to your real database here
    try {
      let user = await this.prisma.account.findUnique({
        where: {
          email: email,
        },
      })

      let result = this.checkPassword(password, user.password);
      
      console.log("What's the result? " + result);

      if(user && result) {
        return user;
      } else {
        return false;
      }
    }
    catch {
      console.log("caught");
      return false
    }

  }
  async createUser(user: IUser): Promise<IUser | boolean> {
    try {
      const userExist = await this.prisma.account.findUnique({
        where: {
          email: user.email,
        },
      })
      if(userExist) {
        return false;
      } else {
        let passwordHash;

        await bcrypt.genSalt(saltRounds)
          .then(salt => {
            return bcrypt.hash(user.password, salt);
          })
          .then(hash => {
            passwordHash = hash;
          })
          .catch(err => console.log(err));

        const newUser = await this.prisma.account.create({
          data: {
            username: user.username,
            password: passwordHash,
            first_name: user.first_name,  
            last_name: user.last_name,
            email: user.email
          },
        })

        return newUser;
      }
    }
    catch {
      throw new Error("Implementation error.");
    }
  }

  private checkPassword(password: string, hash: string): boolean {
    console.log("Is it happening?")
    const result = bcrypt.compareSync(password, hash, (err: string, res: boolean) => {
      return res
    })

    return result;
  }
}
