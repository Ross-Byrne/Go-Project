
// System imports
import { Component }    from '@angular/core';
import { Router }       from '@angular/router';
import { ThreadService }    from './thread.service';

@Component({
  moduleId: module.id,
  selector: 'thread-partial',
  templateUrl: 'thread-partial.component.html',
  providers:[ThreadService]
})

export class ThreadPartialComponent {

    title = "Title Of thread";
    body = "Hello, I need help with my GO Code";
    author = "Username";
    tags = ["Go","HTML","angular 2"];

    threads: string[];

    constructor(threadService: ThreadService){
        this.threads=threadService.getThreads();
    }
}