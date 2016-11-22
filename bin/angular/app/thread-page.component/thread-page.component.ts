
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

    startIndex: number = 0;
    threadsPerPage: number = 5;

    threads: Thread[] = [];

    threadTitle: string = "";
    threadBody: string = "";
    threadTags: string = "";

    constructor(
        private router: Router,
        private threadService: ThreadService) {
    }

    opened: Boolean = false;
    toggle () {
      this.opened = !this.opened;
      this.goToBottomOfPage(10);
    }



    ngOnInit(): void {
      this.threadService.getThreads()
           .then(threads => this.threads = threads);
    }

    gotoDetail(thread: Thread): void {
        let link = ['/threads', thread.id];
        this.router.navigate(link);
    }

    nextPage(): void {
      if(this.startIndex < this.threads.length - this.threadsPerPage){
        this.startIndex++;
      } // if;
    } // nextPage()

    previousPage(): void {
      if(this.startIndex > 0){
        this.startIndex--;
      } // if
    } // previousPage()

    lastPage(): void {
      while(this.startIndex < this.threads.length - this.threadsPerPage){
        this.startIndex++;
      } // if;
    } // lastPage()

    goToBottomOfPage(timeout: number): void {

      // wait a selected amount of time before scrolling to bottom of page
      window.setTimeout( function () { document.getElementById('bottomOfPage').scrollIntoView(); }, timeout );

    } // goToBottomOfPage()

    goToTopOfPage(timeout: number): void {

      // wait a selected amount of time before scrolling to bottom of page
      window.setTimeout( function () { document.getElementById('topOfPage').scrollIntoView(); }, timeout );

    } // goToTopOfPage()

    saveThread(threadTitle: string,threadBody: string,threadTags: string): void {

      //add validation to avoid blank posts

      var thread: Thread = new Thread();
      var splitTags=threadTags.split(",");

      thread.author = "Martin";
      thread.title = threadTitle;
      thread.body = threadBody;
      thread.tags = splitTags;
      thread.id = "0"; 
      thread.threadPostId = "0"; 



      // add the thread to the threads object (this is temp)
      this.threads.push(thread);

      // scroll to the bottom of the page (so thread can be seen)
      this.goToBottomOfPage(10);

      // try to go to the last page
      this.lastPage();

      // save in couchDB
      this.threadService.saveThread(thread);

      // clear
      this.threadTitle = "";
      this.threadBody = "";
      this.threadTags = "";

    } // saveThread

}//end ThreadPageComponent