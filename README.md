# Go-Project
4th year emerging technologies project using Go, CouchDb and Angular 2. 

Check out the Wiki here: https://github.com/Go-project-HQ/Go-Project/wiki<br>
Check out the latest release of the project here: https://github.com/Go-project-HQ/Go-Project/releases

#Introduction
The goal of this project was to create a single page web application using a go back-end server for our emerging technologies module. We decided to use Angular 2 as our Front end as it is new and this was a good opportunity to learn it. We decided to use CouchDb as our database because of its powerful user management. This includes user authenication and creation as well as session management. 

Our original idea was to create a forum for sharing and editing code snipping and general conversation about programing. Due to unforeseen circumstances we had to reduce the scope of the project. Our current project is a forum with user login and sign-up.

#Features
###Login:
This page handles user authentication. Users enter their login information. Angular passes this information to the Go server. The Go server checks user information on CouchDb and passes the result back to Angular. If successful the user will be redirected to their dashboard.

###Signup:
This page handles user registration. User enters their details. Angular passes this information to the Go server. The Go server checks if the users information is already stored on CouchDb. If not a new user is created and Angular redirects the user to the Login Page.

###User Dashboard:
This page is a dashboard that is unique to each user. Its displays all the threads that the user has created on the server.

###Thread Page:
This page displays all of the threads posted to the server. Threads are clickable and redirects to see all the posts replying to the threads. The page also contains a button that opens a form that allows users to add a new post to the forum.

###Posts Page:
This page displays all of the posts a given thread contains. Users can also add a new post to the thread.

#Installation
##Install the necessary technologies: 

Download and install the latest version of Go: https://golang.org/dl/<br>
Download node from here: https://nodejs.org/en/download/

NodeJS V 6.9.1 LTS or greater is required.<br>
Git is also required for cloning and getting packages in Go.

##Get the project folder with source code:

Either download zip or git clone the repository using the https url

URL: https://github.com/Go-project-HQ/Go-Project.git

##Set your go path: 

####For Linux Run:
```
export GOPATH=$HOME/path/to/project
```
####For Windows Run:
```
set GOPATH=c:\path\to\project
```
##Install necessary dependencies:

With GOPATH set, in a terminal or CMD with Git enabled, run:
```
go get github.com/rhinoman/couchdb-go
```

##Setup Angular 2
You need to install node_modules for the Angular 2 app and compile the Typescript.

Navigate to bin/angular folder in project folder:

####If on Windows, run the following commands in NodeJS cmd

#####To install the required packages Run:
```
npm install
```
#####To compile the Typescript Run:
```
npm start
```

Compiling the Typescript will run the Angular app in the browser in development mode. Close this window as it is being served on the wrong port.

In very small number of cases on Windows, command "npm start" fails. If this happens, you need to manually install the following npm packages:

```
npm install -g concurrently
```
```
npm install -g lite-server 
```
```
npm install -g typescript
```

##Compile and Run Go Server:
####Navigate to bin directory in Project directory:

Build main.go into bin from src/main.

#####Run the following command from bin directory:

```
go build ../src/main/main.go
```

#####Run the compiled binary file called main in the bin directory:

####On Windows Run:
```
main.exe
```
####On Linux Run:
```
./main
```
(Now server is running)

##Use Web App
In your browser navigate to localhost:8080

Webpage should now load from Go server

#Technologies

##Database
###CouchDB
CouchDB is a NoSQL Document database. Couch is simple to use and has great user management functionality.
For ease of use, we decided to use Smileupps to host our CouchDB instance.

More information on both CouchDB and Smileupps can be found below:

CouchBD: https://couchdb.apache.org/<br>
Smileupps: https://www.smileupps.com/ 

#####As our Smileupps account is a trial account, it will expire on the 23/12/2016.
Once this happens, connecting to the database will no longer be possible. You will have to replace the urls on the Go server to point at your own instance of CouchDB.

Using CouchDB's update handler we created a design document with a Javascript update function to insert posts into an array of posts in a document in CouchDB.
We used information from the couchDB documentation to achieve this.
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
    
    // if the post object is parsed correctly
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

https://couchdb-a21442.smileupps.com/posts/_design/post/_update/addPost/a6df9fd5-3aaa-4cb8-b08f-b4daa83d406b

URL Component | Explanation 
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
   Id           string
   ThreadPostId string
   Body         string
   AuthorName   string
}
```

##Front End
###Angular 2
Angular 2 is the latest version of the Angular framework released in 2016. Angular is an open source JavaScript framework to build web applications in HTML and JavaScript. Angular 2 uses Typescript to add type security to Javascript.

We decided to use Angular 2 because of its powerful templates, partials, fast rendering, data management, HTTP services, form handling and routing. This made it ideal for developing a robust single page web application.

For CCS styling we elected to use Bootstrap 3. This is because of its ease of use and fast design times.<br>

####Links:
Angular 2: https://angular.io/<br>
Bootstrap: http://getbootstrap.com/

###Typescript
Typescript is a typed superset of Javascript that compiles to plain Javascript. It works in any browser and on any operating system. We used typescript in our project as it is a major component of Angular 2 and it was a good opportunity to learn Typescript.

##Api and Server
###Go Server
Go is a free and open source programming language created at Google in 2007 by Robert Griesemer, Rob Pike, and Ken Thompson. It was designed to resolve common criticisms of other languages while maintaining their positive characteristics.
We use Go as our API server and to host Angular 2

We wrote our Go webserver using the default net/http package and a third party package for connecting to CouchDB

CouchDB Go Package: https://github.com/rhinoman/couchdb-go<br>
CouchDB Go package can be installed with go command:
```
go get github.com/rhinoman/couchdb-go
```
###Go API
There is a list of API calls that our Angular front end makes to the server. All work related to the database in done on the Go server and the results are passed back to the frontend. This loosely coupled design will allow use to change the database without touching the Angular 2 frontend application.

####List of API calls that can be made to the server:
API URL | HTTP Method | Request Data | Response Data 
------------ | ----------- | ----------- | -----------
"/" | GET | None. | index.html and all required resources. This includes the whole angular 2 app.
"/api/savePost" | POST | Post Object and Session Cookie Object. | ThreadPost object that includes all posts.
"/api/getThreadPosts" | POST | Object with ThreadPost ID and Session Cookie. | ThreadPost object that includes all posts.
"/api/saveThread" | POST | Thread object and Session Cookie. | The thread object that was saved.
"/api/getThreads" | POST | Session Cookie object. | Array of all threads.
"/api/createUser" | POST | Object with username and password. | None.
"/api/login" | POST | Object with username and password. | Session Cookie object.
"/api/logout" | POST | Session Cookie object. | None.

#Testing
To ensure the quality of our software we used test driven development. Every API call was tested after it was designed and implemented. The tool we used to test was Postman:
https://www.getpostman.com/

##Postman
Postman is an API tool that allows you to build debug and test API's faster. Postman lets you create and send any HTTP requests using its request builder, Write your own test cases to validate response data and response times.

##Users
We have created many test users to simulate activity on the forum. An example of one of our test users can be found below.

#####Username:
```
testUser
```
#####Password:
```
1234
```
#Security
###User Authentication
User authentication is handled by CouchDB using Session Cookies.
Once a user is logged in, they receive a session cookie from CouchDB, which creates the session once passed the user's login details.

Any API calls to the Go server, other then new user creation, must have a session cookie.
The Go server then uses the session cookie for authenticating calls to CouchDB.

###Routing
As a form of security, when the webpage loads, the user is directed to the login/signup page if there is no logged in user.
If manual routes are typed into the address bar while a user is not logged in, the user is redirected to the login/signup page.
If manual routes are typed into the address bar, that are not valid, the user is redirected to the homepage.

#Deployment
##Local
We deployed and tested the project on both Linux and Windows operating systems.

####Linux Version
Ubuntu 16.04 LTS

####Windows Version
Windows 10

##Azure
We deployed and tested the project on Ubuntu server 16.04 LTS.

Setting up the Ubuntu Server on Azure involved creating a Virtual Machine and installing the operating system. We then had to open some endpoints on the VM in Azure. These included port 443 for https and port 8080 for the Go Server. When setting up the installation of Ubuntu Server, we SSH'd into the server, updated it and installed the required dependencies, such as NodeJS, NPM, Go and Git. We were then able to clone the project, run the Go Server and connect to it remotely.

#Development
The project was both developed and tested on Windows 10 and Ubuntu 16.04 LTS

#Project Management
We used slack (https://slack.com/is) for managing our team communications and we used GitHub for managing our source control and issue tracking.
