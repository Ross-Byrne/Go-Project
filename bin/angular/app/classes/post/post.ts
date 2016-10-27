
// physical post class.
// stored as an array in the posts class for a thread.
export class Post {

  id: number;             // id number of post
  threadId: number;       // id of thread post is in
  body: string;           // post message body
  authorId: string;       // the user Id of the user who made the post
  authorName: string;     // the saved user name so it doesn't have to be looked up later
  
} // ThreadPosts Class