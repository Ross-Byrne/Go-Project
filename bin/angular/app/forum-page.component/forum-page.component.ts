
// System imports
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Router }       from '@angular/router';

import { Post } from '../classes/post/post';
import { ThreadPosts } from '../classes/thread-posts/thread-posts';
import { SessionCookie } from '../classes/session-cookie/session-cookie';
import { User } from '../classes/user/user';

import { ForumPostsService } from '../forum-posts.service/forum-posts.service';
import { AuthenticationService } from '../auth.service/authentication.service';


@Component({
  moduleId: module.id,
  selector: 'forum-page',
  templateUrl: 'forum-page.component.html'
})

export class ForumPageComponent implements OnInit {

    title: string = "Thread Name"; // thread name
    //thread: Thread;
    threadPosts: ThreadPosts = new ThreadPosts(); // initialise object
    threadPostsId: string = "";

    // text for post
    postText: string = "";

    startIndex: number = 0; // starting index of displayed posts
    postsPerPage: number = 8;

    constructor(
      private forumPostsService: ForumPostsService,
      private authenticationService: AuthenticationService,
      private route: ActivatedRoute,
      private router: Router,
      private location: Location  
    ) {}

    ngOnInit(): void {

      // check it logged in
      if(this.authenticationService.userName === ""){ // if not

        // go to the login page
        this.router.navigate(['/login']);

      } // if

      // for each parameter in the route url
      this.route.params.forEach((params: Params) => {

        // get the param id (this is the threadPostId)
        let id = params['id'];
        this.threadPostsId = id;

        // get the posts from the thread with the id from the url
         this.forumPostsService.getPostsByThreadId(id)
           .then(threadPosts => this.threadPosts = threadPosts);        // save the posts object
      });
    } // ngOnInit()

    nextPage(): void {

      if(this.startIndex < this.threadPosts.Posts.length - this.postsPerPage){

        this.startIndex++;

      } // if;

    } // nextPage()

    previousPage(): void {
      
      if(this.startIndex > 0){

        this.startIndex--;

      } // if

    } // previousPage()

    savePost(postBody: string): void {

      var post: Post = new Post();

      post.AuthorName = this.authenticationService.userName;
      post.Body = postBody;
      post.ThreadPostId = this.threadPostsId; // this equals threadPosts._id (from couchDB)(used for saving)
      post.Id = ""; // this is set on the server

      this.forumPostsService.createPost(post) // save the post in couchDB
      .then(threadPosts => this.threadPosts = threadPosts) // update posts on screen
      .then(() => {this.goToBottomOfPage(10);}) // scroll to bottom of page
      .then(() => {this.nextPage();}) // try go to next page just incase your post ends up on there

      
     // this.forumPostsService.createPost(post);

      // clear the post textarea
      this.postText = "";

    } // savePost

    goToBottomOfPage(timeout: number): void {

      // wait a selected amount of time before scrolling to bottom of page
      window.setTimeout( function () { document.getElementById('bottomOfPage').scrollIntoView(); }, timeout );

    } // goToBottomOfPage()

    goToTopOfPage(timeout: number): void {

      // wait a selected amount of time before scrolling to bottom of page
      window.setTimeout( function () { document.getElementById('topOfPage').scrollIntoView(); }, timeout );

    } // goToTopOfPage()

    goBack(): void {
      this.location.back();
    }
}