
// System imports
import { Component,Input }    from '@angular/core';
import { Router }       from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'thread-partial',
  templateUrl: 'thread-partial.component.html'
})

export class ThreadPartialComponent {

    title = "Title Of thread";
    body = "Hello, I need help with my GO Code";
    author = "Username";
    tags = ["Go","HTML","angular 2"];

    @Input()
    threads: string[];

    /*constructor(threadService: ThreadService){
        this.threads=threadService.getThreads();
    }*/
}