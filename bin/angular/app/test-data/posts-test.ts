
// fake data source for posts for testing

import { Post } from '../classes/post/post';
import { ThreadPosts } from '../classes/thread-posts/thread-posts';

export const POSTS: ThreadPosts[] = 
 [
    {   
        Posts: 
        [
            { Id: "", ThreadPostId: "", Body: "This is the post text. This is the post text. This is the post text. This is the post text. This is the post text. This is the post text.", AuthorName: 'Mr. Nice'},
            { Id: "", ThreadPostId: "", Body: "This is the post text. This is the post text. This is the post text. This is the post text. This is the post text. This is the post text.", AuthorName: 'Narco'},
            { Id: "", ThreadPostId: "", Body: "This is the post text. This is the post text. This is the post text. This is the post text. This is the post text. This is the post text.", AuthorName: 'Bombasto'}
        ]
    },
    { 
        Posts: 
        [
            {Id: "", ThreadPostId: "", Body: "This is the post text. This is the post text. This is the post text. This is the post text. This is the post text. This is the post text.", AuthorName: 'Celeritas'},
            {Id: "", ThreadPostId: "", Body: "This is the post text. This is the post text. This is the post text. This is the post text. This is the post text. This is the post text.", AuthorName: 'Magneta'},
            {Id: "", ThreadPostId: "", Body: "This is the post text. This is the post text. This is the post text. This is the post text. This is the post text. This is the post text.", AuthorName: 'RubberMan'}
        ]
    },
    {   
        Posts: 
        [
            { Id: "", ThreadPostId: "", Body: "This is the post text. This is the post text. This is the post text. This is the post text. This is the post text. This is the post text.", AuthorName: 'Dynama'},
            { Id: "", ThreadPostId: "", Body: "This is the post text. This is the post text. This is the post text. This is the post text. This is the post text. This is the post text.", AuthorName: 'Dr IQ'},
            { Id: "", ThreadPostId: "", Body: "This is the post text. This is the post text. This is the post text. This is the post text. This is the post text. This is the post text.", AuthorName: 'Magma'}
        ]
    }
];