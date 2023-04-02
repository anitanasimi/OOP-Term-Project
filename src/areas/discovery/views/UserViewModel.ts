import IUser from "../../../interfaces/user.interface";

export class UserViewModel {
  public name: string;

  constructor(user: IUser) {
    this.name = user.firstName + " " + user.lastName
  }
}