
import { Injectable } from '@angular/core';

import { Hero } from '../classes/hero/hero';
import { HEROES } from '../mock-heroes';

@Injectable()
export class HeroService {

    // uses a Promise to return heroes asynchronously onces they are ready
    getHeroes(): Promise<Hero[]> {

        return Promise.resolve(HEROES);
    }

    getHero(id: number): Promise<Hero> {
        
        return this.getHeroes()
                    .then(heroes => heroes.find(hero => hero.id === id));
    }

}