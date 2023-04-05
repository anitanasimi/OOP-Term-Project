// import IPost from "./post.interface";
import IUser from "../../../interfaces/user.interface";

// ⭐️ Feel free to change this interface in any way you like. It is simply an example...
export interface IAuthenticationService {
  _db: any;
  findUserByEmail(email: String): Promise<IUser | boolean> ;

  createUser(user: IUser): Promise<IUser | boolean>;

  getUserByEmailAndPassword(email: string, password: string): Promise<IUser | boolean>;
}
