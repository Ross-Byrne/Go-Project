import { Injectable } from '@angular/core';

import { Thread } from '../classes/thread/thread';
import { THREADS } from '../mock-threads';

@Injectable()
export class ThreadService {

    // uses a Promise to return threads asynchronously onces they are ready
    getThreads(): Promise<Thread[]> {

        return Promise.resolve(THREADS);
    }

    getThread(id: number): Promise<Thread> {
        
        return this.getThreads()
                    .then(threads => threads.find(thread => thread.id === id));
    }

}