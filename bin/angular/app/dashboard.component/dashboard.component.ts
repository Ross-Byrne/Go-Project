
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Thread } from '../classes/thread/thread';
import { ThreadService } from '../thread.service/thread.service';
import { AuthenticationService } from '../auth.service/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: [ 'dashboard.component.css' ]
})

export class DashboardComponent implements OnInit {

  //variables for paging
    startIndex: number = 0;
    threadsPerPage: number = 5;

    //array of threads to be displayed
    threads: Thread[] = [];

    constructor(
        private router: Router,
        private threadService: ThreadService,
        private authenticationService: AuthenticationService) {
    }

    //calls threads on page load
    ngOnInit(): void {
      // check if logged in
      if(this.authenticationService.userName === ""){ // if not

        // go to the login page
        this.router.navigate(['/login']);

      } // if

          this.threadService.getThreads()
           .then(threads => this.threads = threads.filter(item => item.Author == this.authenticationService.userName)); 
    }

    //link to view thread and all its posts
    gotoDetail(thread: Thread): void {
        let link = ['/threads', thread.ThreadPostId];
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

}