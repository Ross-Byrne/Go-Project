
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Thread } from '../classes/thread/thread';
import { ThreadService } from '../thread-page.component/thread.service';

@Component({
  moduleId: module.id,
  selector: 'my-thread-detail',
  templateUrl: 'thread-detail.component.html'
})

export class ThreadDetailComponent implements OnInit {

    @Input()
    thread: Thread;
    

    constructor(
      private threadService: ThreadService,
      private route: ActivatedRoute,
      private location: Location
    ) {}

    ngOnInit(): void {
      this.route.params.forEach((params: Params) => {
        let id = +params['id'];
        this.threadService.getThread(id)
          .then(thread => this.thread = thread);
      });
    }

    goBack(): void {
      this.location.back();
    }
}