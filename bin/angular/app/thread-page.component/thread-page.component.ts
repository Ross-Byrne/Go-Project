
// System imports
import { Component, OnInit }    from '@angular/core';
import { Router }       from '@angular/router';

import { Thread } from '../classes/thread/thread';
import { ThreadService } from '../thread.service/thread.service';
import { AuthenticationService } from '../auth.service/authentication.service';


@Component({
  moduleId: module.id,
  selector: 'thread-page',
  templateUrl: 'thread-page.component.html'
})

export class ThreadPageComponent implements OnInit {
    //variables for paging
    startIndex: number = 0;
    threadsPerPage: number = 5;

    //array of threads to be displayed
    threads: Thread[] = [];

    //variables for making a new post
    threadTitle: string = "";
    threadBody: string = "";
    threadTags: string = "";
    errorLabel: string = "";

    constructor(
        private router: Router,
        private threadService: ThreadService,
        private authenticationService: AuthenticationService) {
    }

    //toggle to move to bottom of page
    opened: Boolean = false;
    toggle () {
      this.opened = !this.opened;
      this.goToBottomOfPage(10);
    }

    //calls threads on page load
    ngOnInit(): void {

      // check if logged in
      if(this.authenticationService.userName === ""){ // if not

        // go to the login page
        this.router.navigate(['/login']);

      } // if

      this.threadService.getThreads()
           .then(threads => this.threads = threads);
    }

    //link to view thread and all its posts
    gotoDetail(thread: Thread): void {
        let link = ['/threads', thread.ThreadPostId, thread.Title];
        this.router.navigate(link);
    }

    //Moves to next Page of threads
    nextPage(): void {
      if(this.startIndex < this.threads.length - this.threadsPerPage){
        this.startIndex++;
      } // if;
    } // nextPage()

    //Moves to previous Page of threads
    previousPage(): void {
      if(this.startIndex > 0){
        this.startIndex--;
      } // if
    } // previousPage()

    //Moves to last Page of threads
    lastPage(): void {
      while(this.startIndex < this.threads.length - this.threadsPerPage){
        this.startIndex++;
      } // if;
    } // lastPage()

    //scrolls to bottomOfPage
    goToBottomOfPage(timeout: number): void {
      // wait a selected amount of time before scrolling to bottom of page
      window.setTimeout( function () { document.getElementById('bottomOfPage').scrollIntoView(); }, timeout );
    } // goToBottomOfPage()

    //scrolls to topOfPage
    goToTopOfPage(timeout: number): void {
      // wait a selected amount of time before scrolling to bottom of page
      window.setTimeout( function () { document.getElementById('topOfPage').scrollIntoView(); }, timeout );
    } // goToTopOfPage()

    //passes a new thread to the go server
    saveThread(threadTitle: string,threadBody: string,threadTags: string): void {
      //add validation to avoid blank posts

      if(threadTitle==""||threadBody==""||threadTags==""||this.authenticationService.userName==""){
        this.errorLabel= "Insufficent Data";
      }
      else{
        var thread: Thread = new Thread();
        var splitTags=threadTags.split(",");

        //initialise thread struct from parameters
        thread.Author = this.authenticationService.userName;
        thread.Title = threadTitle;
        thread.Body = threadBody;
        thread.Tags = splitTags;
        thread.Id = ""; 
        thread.ThreadPostId = ""; 

        // save thread in couchDB
        this.threadService.saveThread(thread)
          .then(() => {this.threadService.getThreads()
          .then(threads => this.threads = threads);})
          .then(() => {this.goToBottomOfPage(10);}) // scroll to the bottom of the page (so thread can be seen)
          .then(() => {this.lastPage();}); // try to go to the last page

          //gets latest threads
        // this.threadService.getThreads()
        //   .then(threads => this.threads = threads);

        // clear the make post objects
        this.threadTitle = "";
        this.threadBody = "";
        this.threadTags = "";
        this.errorLabel = "";

      }//end else

} // saveThread()

}//end ThreadPageComponent