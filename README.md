# Go-Project
4th year emerging technologies project using Go, CouchDb and Angular 2. 

#Introduction
The goal of this project was to create a single page web application using a go back-end server for our emerging technologies module. We decided to use Angular 2 as our Front end as it is new and this was a good opportunity to learn it. We decided to use CouchDb as our database because of its powerful user management. This includes user authenication and creation as well as session management. 

Our original idea was to create a forum for sharing and editing code snipping and general conversation about programing. Due to unforeseen circumstances we had to reduce the scope of the project. Our current project is a forum with user login and sign-up.

#Features
###Login:
This page handles user authentication. Users enter their login information. Angular passes this information to the Go server. The Go server checks user information on couchDb and passes the result back to Angular. If successful the user will be redirected to their dashboard.

###Signup
This page handles user registration. User enters their details. Angular passes this information to the Go server. The Go server checks if the users information is already stored on couchDb. If not a new user is created and Angular redirects the user to the Login Page.

###User Dashboard
This page is a dashboard that is unique to each user. Its displays all the threads that the user has created on the server.

###Thread Page
This page displays all of the threads posted to the server. Threads are clickable and redirects to see all the posts replying to the threads.The page also contains a button that opens a form that allows users to add a new post to the forum.

###Posts Page
This page displays all of the posts a given thread contains. Users can also add a new post to the thread.

#Installation
Install necessary Technologies (node npm go)

Download and install the latest version of Go: https://golang.org/dl/

Download node from here: https://nodejs.org/en/download/

NodeJS V 6.9.1 LTS for greater.

Possibly install(npm install -g concurrently npm install -g lite-server npm install -g typescript)

Git clone "url here"

Set your go path: 

How to for linux
type: export GOPATH=$HOME/path/to/project

How to for Windows
type: set GOPATH=c:\path\to\project

Install necessary dependancies:

With GOPATH set, in a terminal or CMD with Git enabled, run:
go get github.com/rhinoman/couchdb-go

Navigate to bin/angular folder in project folder:

If on Windows, run the following commands in NodeJS cmd

run - npm install
run - npm start to compile code

if npm start files, might need to manually install the following npm packages:
npm install -g concurrently 
npm install -g lite-server 
npm install -g typescript

Navigate to bin directory in Project directory:
build main.go into bin from src/main

Command, run from bin dir: go build ../src/main/main.go

run compiled binary file called main	
E.g.	windows main.exe
	linux ./main

(Now server is running)

In your browser navigate to localhost:8080

Webpage should now load from Go server

#Tutorial
tutorial on how to use webapp here

#Technologies

##Database

Using couchDB's update handler we created a design document with a javascript update function to insert posts into an array of posts in a document in couchDB.
Used information from the couchDB documentation to achieve this.
Found here: https://wiki.apache.org/couchdb/Document_Update_Handlers

The design document resides in the posts database where the posts from threads are stored.

It looked as follows:

```json
{
   "_id": "_design/post",
   "_rev": "37-7f471db356f3fc1152a738937728d7e3",
   "updates": {
       "addPost": "function (doc, req) { var post = JSON.parse(req.body); if(post != null){ 	doc.Posts.push(post); return [doc, 'Successfully Updated!'];}else{return [null, 'Error! Post not in correct format!'];}}"
   }
}
```
The actual function:
```javascript
function (doc, req) { 
    // parses a json post object that was posted to couchDB 
    var post = JSON.parse(req.body); 
    
    // if the post object as parsed correctly
    if(post != null){ 
      
        // add the post object into the array of posts
        doc.Posts.push(post); 
        
        // save the doc and return the message 'Successfully updated'
        return [doc, 'Successfully Updated!'];
     }
     else // otherwise
     {  
          // don't save the document, return error message
         return [null, 'Error! Post not in correct format!'];
     }
}
```
How the post url would be laid out

"\<Domain>/\<db>/\<designDocument>/\<_update>/\<updateFunction>/\<documentID>"

An Example POST URL is as follows:

https://couchdb-e195fb.smileupps.com/posts/_design/post/_update/addPost/a6df9fd5-3aaa-4cb8-b08f-b4daa83d406b

URL Componet | Explanation 
------------ | -----------
smileupps.com | The domain name
posts         | The name of the database in CouchDB
_design/post  | The name of the design document
_update       | References the functions in "updates" property (see above)
addPost       | The name of the function that adds the post to the array
a6df9fd5-3aaa-4cb8-b08f-b4daa83d406b | The _id of the document being updated

The JSON being posted to CouchDB in the body of the POST request has to be a Post Struct converted to JSON and sent from the Go server.
Post Struct in Go:

```go
type Post struct {
	Id int
	ThreadId int
	Body string
	AuthorId string
	AuthorName string
}
```

##Front End
###Angular 2
Angular 2 here

###Typescript
Typescript here

##Api and Front-end server
###Go
Golang here

#Testing
To ensure the quality of our software we used test driven development. Every API call was tested after it was designed and implemented.The tool we used to test was Postman:
https://www.getpostman.com/

##Postman
Postman is an API tool that allows you to build debug and test API's faster.Postman lets you create and send any HTTP requests using its request builder, Write your own test cases to validate response data and response times.

//screenshot here?

#Security
###User Authentication
User authentication is handled by CouchDB using Session Cookies.
Once a user is logged in, they recieve a session cookie from CouchDB, which creates the session once passed the user's login details.

Any API calls to the Go server, other then new user creation, must have a session cookie.
The Go server then uses the session cookie for authenticating calls to CouchDB.

###Routing
As a form of security, when the webpage loads, the user is directed to the login/signup page if there is no logged in user.
If manual routes are typed into the address bar while a user is not logged in, the user is redirected to the login/signup page.
If manual routes are typed into the address bar, that are not valid, the user is redirected to the homepage.

#Deployment
We deployed and tested the project on ubuntu server 16.04 LTS.

#Project Management
We used slack (https://slack.com/is) for managing our team communications and we used Github for managing our source control and issue tracking.
