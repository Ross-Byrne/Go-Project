
import { Injectable } from '@angular/core';

import { Post } from '../classes/post/post';
import { ThreadPosts } from '../classes/thread-posts/thread-posts';
import { POSTS } from '../test-data/posts-test';

@Injectable()
export class ForumPostsService {

    // uses a Promise to return posts asynchronously onces they are ready
    getPostsByThreadId(id: number): Promise<ThreadPosts> {

        return Promise.resolve(POSTS).then(posts => posts.find(posts => posts.threadId === id));
        
    } // getPostsByThreadId()

   /* getHero(id: number): Promise<Hero> {
        
        return this.getHeroes()
                    .then(heroes => heroes.find(hero => hero.id === id));
    }*/

}