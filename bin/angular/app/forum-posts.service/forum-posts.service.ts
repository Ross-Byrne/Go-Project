
import { Injectable } from '@angular/core';

import { Post } from '../classes/post/post';
import { POSTS } from '../test-data/posts-test';

@Injectable()
export class ForumPostsService {

    // uses a Promise to return posts asynchronously onces they are ready
    getPostsByThreadId(id: number): Promise<Post[]> {

        return Promise.resolve(POSTS).then(posts => posts.filter(post => post.threadId === id));
        
    } // getPostsByThreadId()

   /* getHero(id: number): Promise<Hero> {
        
        return this.getHeroes()
                    .then(heroes => heroes.find(hero => hero.id === id));
    }*/

}