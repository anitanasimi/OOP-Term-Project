import { database } from "./src/model/fakeDB";

const users = database.users

const followUser = (user, accountFollowed) => {
  const accountId = user.id;
  for (const user of users) {
    if ((user.id = accountId)) {
      user.following.push(accountFollowed.id);
    }
  }
};

const filterUsers = (keyword) => {
  const foundUsers = [];
  for (const user of users) {
    if (
      user.firstName.contains(keyword) ||
      user.lastName.contains(keyword) ||
      user.username.contains(keyword)
    ) {
      foundUsers.push(user);
    }
  }
  return foundUsers;
};

const filterPosts = (keyword) => {
  const foundPosts = [];
  for (const user of database.users) {
    for (const post of user.posts) {
      if (post.message.contains(keyword)) {
        foundPosts.push(post);
      }
    }
  }
  return foundPosts;
};

// This will go into a controller
const search = (keyword) => {
  const foundUsers = filterUsers(keyword);
  const foundPosts = filterPosts(keyword);
  res.render("search/views/search", { foundUsers, foundPosts });
};
