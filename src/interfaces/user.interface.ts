import IPost from "./post.interface";

export default interface IUser {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  posts?: Array<IPost>;
  following?: Array<string>;
}
