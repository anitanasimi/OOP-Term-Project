import IComment from "./comment.interface";

interface IPost {
  id: string;
  description: string;
  comment?: any;
  picture?: any;
  pictureId?: string;
  parentTweetId?: string
  parentTweet?: any;
  retweet?: any;
  author?: any
  authorId: string
  userLikes?: any
}

export default IPost;
