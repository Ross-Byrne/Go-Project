
// System imports
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Post } from '../classes/post/post';
import { ForumPostsService } from '../forum-posts.service/forum-posts.service';

@Component({
  moduleId: module.id,
  selector: 'forum-page',
  templateUrl: 'forum-page.component.html'
})

export class ForumPageComponent {

    title: string = "Thread Name"; // thread name
    //thread: Thread;
    posts: Post[];

    startIndex: number = 0; // starting index of displayed posts
    postsPerPage: number = 8;

    constructor(
      private forumPostsService: ForumPostsService,
      private route: ActivatedRoute,
      private location: Location
    ) {}

    ngOnInit(): void {

      // for each parameter in the route url
      this.route.params.forEach((params: Params) => {

        // get the param id
        let id = +params['id'];

        // get the posts from the thread with the id from the url
        this.forumPostsService.getPostsByThreadId(id)
          .then(posts => this.posts = posts);         // save the posts in a local array
      });
    } // ngOnInit()

    nextPage(): void {

      if(this.startIndex < this.posts.length - this.postsPerPage){

        this.startIndex++;

      } // if;

    } // nextPage()

    previousPage(): void {
      
      if(this.startIndex > 0){

        this.startIndex--;

      } // if

    } // previousPage()

    goBack(): void {
      this.location.back();
    }
}