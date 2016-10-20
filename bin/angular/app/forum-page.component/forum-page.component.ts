
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

    //thread: Thread;
    posts: Post[];

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
    }

    goBack(): void {
      this.location.back();
    }
}