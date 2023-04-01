import IComment from "./comment.interface";


import IPost from "./post.interface";

// ⭐️ Feel free to change this interface to your liking
export default interface IDatabase {
  

  posts: IPost[];
  comments: IComment[];
  likes: ILike[];
}
