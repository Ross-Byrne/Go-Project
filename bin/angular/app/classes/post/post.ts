
// physical post class.
// stored as an array in the posts class for a thread.
export class Post {

  Id: string;             // id of post (set on server)
  ThreadPostId: string;   // id of threadposts it is in
  Body: string;           // post message body
  AuthorName: string;     // the saved user name so it doesn't have to be looked up later
  
} // Post Class