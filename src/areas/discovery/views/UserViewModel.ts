import IUser from "../../../interfaces/user.interface";

export class UserViewModel {
  public name: string;
  public following: string[]
  public username: string

  constructor(user: IUser) {
    this.name = user.firstName + " " + user.lastName
    this.username = user.username
    this.following = user.following
  }
}