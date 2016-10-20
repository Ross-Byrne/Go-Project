
// System imports
import { Component, OnInit }    from '@angular/core';
import { Router }       from '@angular/router';


import { Thread } from '../classes/thread/thread';
import { ThreadService } from './thread.service';

@Component({
  moduleId: module.id,
  selector: 'thread-page',
  templateUrl: 'thread-page.component.html'
})

export class ThreadPageComponent implements OnInit {

    //title = "Threads";

    threads: Thread[] = [];

    constructor(
        private router: Router,
        private threadService: ThreadService) {
    }

  ngOnInit(): void {
    this.threadService.getThreads()
      .then(threads => this.threads = threads.slice(1, 5));
  }

    gotoDetail(thread: Thread): void {
        let link = ['/thread', thread.id];
        this.router.navigate(link);
    }
}
