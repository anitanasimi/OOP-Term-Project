# Breakdown of Work

## Week of Mar 27 to Apr 2
Gary Yu

1. Completed set up for Passport and Prisma. Can now log in, sign up, and log out. Logged in user data is currently stored in localSessionStorage, so will still need to figure out how to change the store to Redis.

2. Enabled error messages to be sent to error.log by altering the errorhandler middleware.

3. Passwords stored in database are now hashed by bcrypt. As well, authenication is done with bcrypt compare sync.

4. Error messages show up in webpage following any problems with user login or registration (incorrect credentials or non-unique email).

## Week of Mar 20 to Mar 26
Gary Yu

1. Completed Prisma schema.

## Week of Mar 13 to Mar 19

Jamie Skidmore

1. Studied starter code and Notion page
2. Researched relationship between controllers and services

Gary Yu

1. Started working on Prisma schema.
2. Created localStrategy for Passport (did not work).

## Week of Week of Mar 6 to Mar 12

Jamie Skidmore

1. Simplified ERD model for retweets
2. Read Sam Meech's article on Prisma
3. Looked at Redis doucmentation to improve understanding

Gary Yu

1. Read up on Prisma database generation.
2. Studied previous passport lab.

## Week of Feb 27 to Mar 5

Jamie Skidmore:

1. I built an ERD on draw.io to guide how we will structure the database.

Gary Yu:

1. I created and uploaded the database and tables for the web app, based off of Jamie's ERD.

Anita Nasimi:

1. worked on post.service.mock.ts file. completed: addPost, deletPost, getAllPosts, getAllPostsByUserFolowers, getUserFollowers, sortPosts, likePost, unlikePost, addCommentToPost
