
// Class that holds posts for a thread.
// Identified by threadId.

import { Post } from '../post/post';

export class ThreadPosts {

  id: string;
  threadId: string;             // the id of the thread that these posts belong to
  posts: Post[] = [];                // the array of posts that are in the thread
  
} // Post Class