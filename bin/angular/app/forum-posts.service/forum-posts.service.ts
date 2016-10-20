
import { Injectable } from '@angular/core';

import { Post } from '../classes/post/post';
import { HEROES } from '../mock-heroes';

@Injectable()
export class ForumPostsService {

    // uses a Promise to return heroes asynchronously onces they are ready
  /*  getHeroes(): Promise<Hero[]> {

        return Promise.resolve(HEROES);
    }

    getHero(id: number): Promise<Hero> {
        
        return this.getHeroes()
                    .then(heroes => heroes.find(hero => hero.id === id));
    }*/

}