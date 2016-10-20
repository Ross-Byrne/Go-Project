
// System imports
import { Component, Input }    from '@angular/core';
import { Router }       from '@angular/router';

import { Post } from '../classes/post/post';


@Component({
  moduleId: module.id,
  selector: 'post-partial',
  templateUrl: 'post-partial.component.html'
})

export class PostPartialComponent {

    @Input()    // value passed into partial from forum-page
    post: Post;

    title = "This is the post partial";

}