# Readit

## Project Description

Readit is an alternative to the default Reddit lurking experience. It is aimed at users who want a cleaner and simpler experience with Reddit. The data displayed to the user will be things like subreddits, posts, comments, votes. Users will be able to register, and have full CRUD capabilities with the posts the author.

## List of technologies

* React.js
* Spring Boot
* MongoDB
* MongoClient
  
## Features

* Post, edit, view, and delete posts.
* Register and login as a user
* Predefined list of subreadits users can post to
* Filter posts by subreddits

## User stories

* When I go to '/' (Home Page), I see all of the posts from all subreddits
* When I go to the home page I see a navbar at the top with the option to sign in
* When I click sign in, I am taken to '/login' and I see a login form
* When I don't provide appropriate credentials, a message says "incorrect user or password"
* When I provide appropriate credentials, I am redirected to '/'
* When I go to the home page and I'm signed in I see a navbar at the top with a link to the home page, a logo, and a user icon.
* When I click the user icon, a little "message" pop-up comes out and I can choose to either log out or go to my activity
* When I click "myActivity" I am taken to '/my-activity' and I can see all of the posts and comments I have made.
* When I hover on the top right corner of the post/comment card, an X shows up so that I can delete it.
* When I choose to delete something, A modal pops up asking if I'm sure to delete this. 
* When I go to the home page, I see that above the posts is a filter section to filter by keyword or subreddit. Also there is a button to create a new post.
* If a filter doesn't produce results, Show a message, "there are no results for that :("
* When I click on create a new post, I am taken to '/newpost' and I can then add all the post information, including the subreddit.
* When I don't finish the post form and try to submit, I receive a message that says please fill in all inputs
* When I sucessfully create a post, I am redirected to the single post's page
* When I click on a post I am taken to a new page '/{postId}' where I can see all of the post content plus the comments.

## Stretch Goals

* add post threading functionality - comments can have comments
