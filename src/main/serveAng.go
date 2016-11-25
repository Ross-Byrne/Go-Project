package main

import (
	"bytes"
	"crypto/rand"
	"encoding/json"
	"fmt"
	"github.com/rhinoman/couchdb-go"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
	"time"
)

type Post struct {
	Id           string
	ThreadPostId string
	Body         string
	AuthorName   string
}

type Posts struct {
	Posts []Post
}

type Thread struct {
	Title        string   `json:"Title"`
	Id           string   `json:"Id"`
	ThreadPostId string   `json:"ThreadPostId"`
	Author       string   `json:"Author"`
	Body         string   `json:"Body"`
	Tags         []string `json:"Tags"`
}

type UserDetails struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// taken from couchDB package source code: https://github.com/rhinoman/couchdb-go/blob/master/couchdb.go#L150
type UserRecord struct {
	Name     string   `json:"name"`
	Password string   `json:"password,omitempty"`
	Roles    []string `json:"roles"`
	TheType  string   `json:"type"` //apparently type is a keyword in Go :)
}

//Cookie-based auth (for sessions)
// taken from couchDB package source code: https://sourcegraph.com/github.com/rhinoman/couchdb-go@94e6ab663d5789615eb061b52ed2e67310bac13f/-/blob/auth.go#L34-38
type CookieAuth struct {
	AuthToken        string
	UpdatedAuthToken string
}

type Row struct {
	Id  string `json:"id"`
	Doc Thread `json:"doc"`
}

type ThreadRows struct {
	Total_rows int `json:"total_rows"`
	//Offset 		int `json:"offset"`
	Rows []Row `json:"rows"`
}

// struct with cookie and id for getting Posts
type PostsData struct {
	Cookie CookieAuth
	Id     string
}

// struct for creating posts, with a post and cookie in it
type PostData struct {
	Cookie CookieAuth
	Post   Post
}

// struct for creating a thread, with thread object and cookie
type ThreadData struct {
	Cookie CookieAuth
	Thread Thread
}

//var couchDBUrl string = "couchdb-e195fb.smileupps.com"
var couchDBUrl string = "couchdb-a21442.smileupps.com"


// for serving angular resources (all angular app files needed)
var chttp = http.NewServeMux()

func main() {

	

	// handle for serving resource
	chttp.Handle("/", http.FileServer(http.Dir("./angular")))

	// handle serving index.html at root
	http.HandleFunc("/", homeHandler)

	// handler for saving posts made by user to couchDB
	http.HandleFunc("/api/savePost", savePostHandler)

	// handler for loading threadPost from couchDB
	http.HandleFunc("/api/getThreadPosts", getThreadPosts)

	// handler for saving threads made by user to couchDB
	http.HandleFunc("/api/saveThread", saveThreadHandler)

	// handler for getting threads from couchDB
	http.HandleFunc("/api/getThreads", getThreadHandler)

	// handler for creating a new user
	http.HandleFunc("/api/createUser", createUserHandler)

	// handler for logging a user in
	http.HandleFunc("/api/login", loginHandler)

	// handler for logging a user out
	http.HandleFunc("/api/logout", logoutHandler)

	// give the user feedback
	fmt.Println("Listening on port 8080")

	// listen on port and handle connections
	http.ListenAndServe(":8080", nil)

} // main()

// handler for root address
func homeHandler(w http.ResponseWriter, r *http.Request) {

	/*
	   To get routing to work in the angular app, the index.html file needs to be served
	   everytime a route is entered into the address bar. This lets angular 2 handle the routing
	   instead of Go. In doing this, I ran into the problem of Go returning js files as html.
	   To solve this (after many many hours) I used some code from the answer on this post
	   Link: http://stackoverflow.com/questions/14086063/serve-homepage-and-static-content-from-root
	*/

	// if path has a . in it, it is looking for a file
	if strings.Contains(r.URL.Path, ".") {

		// print out required file path
		fmt.Println("Reqired File Path:", r.URL.Path)

		// serve the required resources using the resource handle declared further up
		chttp.ServeHTTP(w, r)

	} else { // if path is not for a resource

		// serve the index.html file again, angular 2 is handling the routing
		http.ServeFile(w, r, "angular/index.html")

		// print out feedback
		fmt.Println("Serve index.html")

	} // if

} // homeHandler()

// function for logining in a user (creates a session cookie)
func loginHandler(w http.ResponseWriter, r *http.Request) {

	// read all of the bytes from the request body into a byte array
	body, err := ioutil.ReadAll(r.Body)

	// print out JSON
	fmt.Println("JSON: " + string(body))

	// make user details struct
	var user UserDetails

	// Unmarshal the JSON into the struct
	if err = json.Unmarshal(body, &user); err != nil {
		panic(err)
	}

	// now log the user into couchDB, and get the session cookie
	// set timeout
	var timeout = time.Duration(500 * 100000000)

	// create the connect to couchDB
	conn, err := couchdb.NewSSLConnection(couchDBUrl, 443, timeout)

	// get authentication cookie for user.(creates a session cookie)
	authCookie, err := conn.CreateSession(user.Username, user.Password)

	// check for errors
	if err != nil { // if error, login details are wrong
		log.Println(err)

		// return 403 error
		w.WriteHeader(403)

	} else { // if everything worked

		var jsonBytes []byte

		// marshal the struct into json byte array
		jsonBytes, err = json.Marshal(authCookie)

		// error checks
		if err != nil {
			log.Println(err)
		}

		fmt.Println(string(jsonBytes))

		// Write content-type, statuscode, payload
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(200)
		fmt.Fprintf(w, string(jsonBytes))

	} // if

} // loginHandler()

// function for loging out a user (destroys session cookie)
func logoutHandler(w http.ResponseWriter, r *http.Request) {

	// read all of the bytes from the request body into a byte array
	body, err := ioutil.ReadAll(r.Body)

	// print out JSON
	fmt.Println("JSON: " + string(body))

	// make cookie struct
	var authCookie CookieAuth

	// Unmarshal the JSON into the struct
	if err = json.Unmarshal(body, &authCookie); err != nil {

		log.Println(err)

		w.WriteHeader(500)

		return

	} // if

	// now log the user into couchDB, and get the session cookie
	// set timeout
	var timeout = time.Duration(500 * 100000000)

	// create the connect to couchDB
	conn, err := couchdb.NewSSLConnection(couchDBUrl, 443, timeout)

	// get cookie into correct format
	auth := couchdb.CookieAuth{AuthToken: authCookie.AuthToken, UpdatedAuthToken: authCookie.UpdatedAuthToken}

	// log the user out by destroying the cookie
	err = conn.DestroySession(&auth)

	// check for errors
	if err != nil { // if error, login details are wrong
		log.Println(err)

		// return error
		w.WriteHeader(500)

		return

	} else { // if everything worked

		w.WriteHeader(200)

		fmt.Println("Logged out")

		return

	} // if

} // logoutHandler()

// handler function for creating a user
func createUserHandler(w http.ResponseWriter, r *http.Request) {

	// read all of the bytes from the request body into a byte array
	body, err := ioutil.ReadAll(r.Body)

	// print out JSON
	fmt.Println("JSON: " + string(body))

	// make user details struct
	var user UserDetails

	// Unmarshal the JSON into the struct
	if err = json.Unmarshal(body, &user); err != nil {
		log.Println(err)
	}

	// now create the user in couchDB
	// set timeout
	var timeout = time.Duration(500 * 100000000)

	// create the connect to couchDB
	conn, err := couchdb.NewSSLConnection(couchDBUrl, 443, timeout)

	// set authentication
	auth := couchdb.BasicAuth{Username: "admin", Password: "Balloon2016"}

	roles := []string{}
	// create the user in couchdb
	userData := UserRecord{
		Name:     user.Username,
		Password: user.Password,
		Roles:    roles,
		TheType:  "user"}

	db := conn.SelectDB("_users", &auth)
	namestring := "org.couchdb.user:" + userData.Name
	_, err = db.Save(&userData, namestring, "")

	if err != nil { // if there is an error, user already exists
		w.WriteHeader(409) // return conflict code
		return
	} // if

} // createUserHandler()

// handler for saving posts to couchDB
func savePostHandler(w http.ResponseWriter, r *http.Request) {

	// read all of the bytes from the request body into a byte array
	body, err := ioutil.ReadAll(r.Body)

	// print out JSON
	fmt.Println("JSON: " + string(body))

	// make post struct
	//var post Post
	var postData PostData
	var post Post

	// Unmarshal the JSON into the struct
	if err = json.Unmarshal(body, &postData); err != nil {
		log.Println(err)
	}

	post = postData.Post

	// set a id for the post
	theId, err := newUUID() // generate a UUID

	if err != nil {
		log.Println(err)
	}

	post.Id = theId

	fmt.Println(post)
	fmt.Println(post.Body)

	//"https://couchdb-e195fb.smileupps.com/posts/_design/post/_update/addPost/a6df9fd5-3aaa-4cb8-b08f-b4daa83d406b"

	// URL vars
	domainUrl := "https://"+couchDBUrl+"/"
	updatePostUrl := "posts/_design/post/_update/addPost/"
	threadPostsID := post.ThreadPostId

	theUrl := domainUrl + updatePostUrl + threadPostsID

	// send the Post request to couch, get the response and then close the response body
	resp := sendPostRequestToCouch(theUrl, post)
	defer resp.Body.Close()

	//fmt.Println("response Status:", resp.Status)
	//fmt.Println("response Headers:", resp.Header)

	// read the bytes from the response body of POST request
	body, _ = ioutil.ReadAll(resp.Body)

	fmt.Println("response Body:", string(body))
	//fmt.Println("Done.")

	var id = post.ThreadPostId
	var posts Posts

	var timeout = time.Duration(500 * 100000000)
	conn, err := couchdb.NewSSLConnection(couchDBUrl, 443, timeout)

	// get cookie into correct format
	auth := couchdb.CookieAuth{AuthToken: postData.Cookie.AuthToken, UpdatedAuthToken: postData.Cookie.UpdatedAuthToken}

	//fmt.Println("Used Session Cookie to authenticate")

	db := conn.SelectDB("posts", &auth)

	_, err = db.Read(id, &posts, nil)

	// check errors
	if err != nil {
		panic(err)
	}

	var jsonBytes []byte

	// marshal the struct into json byte array
	jsonBytes, err = json.Marshal(posts)

	// error checks
	if err != nil {
		panic(err)
	}

	// Write content-type, statuscode, payload
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)
	fmt.Fprintf(w, string(jsonBytes))

} // savePostHandler()

// handler for getting posts from couchDB
func getThreadPosts(w http.ResponseWriter, r *http.Request) {

	// read all of the bytes from the request body into a byte array
	body, err := ioutil.ReadAll(r.Body)

	// print out JSON
	fmt.Println("JSON: " + string(body))

	var postsData PostsData

	// Unmarshal the JSON into the struct
	if err = json.Unmarshal(body, &postsData); err != nil {
		panic(err)
	}

	var posts Posts

	var timeout = time.Duration(500 * 100000000)
	conn, err := couchdb.NewSSLConnection(couchDBUrl, 443, timeout)

	// get cookie into correct format
	auth := couchdb.CookieAuth{AuthToken: postsData.Cookie.AuthToken, UpdatedAuthToken: postsData.Cookie.UpdatedAuthToken}

	db := conn.SelectDB("posts", &auth)

	_, err = db.Read(postsData.Id, &posts, nil)

	// check errors
	if err != nil {
		panic(err)
	}

	var jsonBytes []byte

	// marshal the struct into json byte array
	jsonBytes, err = json.Marshal(posts)

	// error checks
	if err != nil {
		panic(err)
	}

	// Write content-type, statuscode, payload
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)
	fmt.Fprintf(w, string(jsonBytes))

} // getThreadPosts()

// handler for saving posts to couchDB
func saveThreadHandler(w http.ResponseWriter, r *http.Request) {

	// read all of the bytes from the request body into a byte array
	body, err := ioutil.ReadAll(r.Body)

	// print out JSON
	fmt.Println("JSON: " + string(body))

	// make thread struct
	var thread Thread
	var threadData ThreadData

	// Unmarshal the JSON into the struct
	if err = json.Unmarshal(body, &threadData); err != nil {
		panic(err)
	}

	thread = threadData.Thread

	//create thread post document and unique id
	theThreadId, err := newUUID() // generate a UUID

	if err != nil {
		panic(err)
	}

	//set threadpost id in struct
	thread.Id = theThreadId

	var posts Posts

	posts.Posts = []Post{}

	thread.ThreadPostId = saveDocumentToCouch(posts, "posts", threadData.Cookie)

	// save the thread to couchDB
	saveDocumentToCouch(thread, "threads", threadData.Cookie)

	var jsonBytes []byte

	// marshal the struct into json byte array
	jsonBytes, err = json.Marshal(thread)

	// error checks
	if err != nil {
		panic(err)
	}

	// Write content-type, statuscode, payload
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)
	fmt.Fprintf(w, string(jsonBytes))

} // savePostHandler()

// theUrl must be full URL including Domain name.
// doc must be the struct with data being posted in the body
// MUST close the response body after it is returned! EG. "defer resp.Body.Close()"
func sendPostRequestToCouch(theUrl string, doc interface{}) *http.Response {

	// adapted from the answer on this stackoverflow question:
	// http://stackoverflow.com/questions/24455147/how-do-i-send-a-json-string-in-a-post-request-in-go

	// set the url
	url := theUrl

	var jsonBytes []byte

	// marshal the struct into json byte array
	jsonBytes, err := json.Marshal(doc)

	// error checks
	if err != nil {
		panic(err)
	}

	// make POST request, send the struct (as JSON) in the body of post
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonBytes))

	// set the Header
	req.Header.Set("Content-Type", "application/json")

	// set the authentication
	req.SetBasicAuth("admin", "Balloon2016")

	// create a client
	client := &http.Client{}

	// send the POST request and get the response
	resp, err := client.Do(req)

	// check for errors
	if err != nil {
		panic(err)
	}

	// return the resp
	return resp

} // sendPostRequestToCouch()

func sendThreadRequestToCouch(theUrl string, doc interface{}) *http.Response {

	// adapted from the answer on this stackoverflow question:
	// http://stackoverflow.com/questions/24455147/how-do-i-send-a-json-string-in-a-post-request-in-go

	// set the url
	url := theUrl
	fmt.Println("URL:>", url)

	var jsonBytes []byte

	// marshal the struct into json byte array
	jsonBytes, err := json.Marshal(doc)

	// error checks
	if err != nil {
		panic(err)
	}

	// make POST request, send the struct (as JSON) in the body of post
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonBytes))

	// set the Header
	req.Header.Set("Content-Type", "application/json")

	// set the authentication
	req.SetBasicAuth("admin", "Balloon2016")

	// create a client
	client := &http.Client{}

	// send the POST request and get the response
	resp, err := client.Do(req)

	// check for errors
	if err != nil {
		panic(err)
	}

	// return the resp
	return resp

} // sendThreadRequestToCouch()

// newUUID generates a random UUID according to RFC 4122
func newUUID() (string, error) {
	uuid := make([]byte, 16)
	n, err := io.ReadFull(rand.Reader, uuid)
	if n != len(uuid) || err != nil {
		return "", err
	}
	// variant bits; see section 4.1.1
	uuid[8] = uuid[8]&^0xc0 | 0x80
	// version 4 (pseudo-random); see section 4.1.3
	uuid[6] = uuid[6]&^0xf0 | 0x40
	return fmt.Sprintf("%x-%x-%x-%x-%x", uuid[0:4], uuid[4:6], uuid[6:8], uuid[8:10], uuid[10:]), nil
}

// generic function to save a document to couchDB
// parameters are, the doc, (eg struct made for documents) and the name of DB as a string
func saveDocumentToCouch(doc interface{}, dbName string, cookie CookieAuth) string {

	// set timeout
	var timeout = time.Duration(500 * 100000000)

	// create the connect to couchDB
	conn, err := couchdb.NewSSLConnection(couchDBUrl, 443, timeout)

	// get cookie into correct format
	auth := couchdb.CookieAuth{AuthToken: cookie.AuthToken, UpdatedAuthToken: cookie.UpdatedAuthToken}

	// select the DB to save to
	db := conn.SelectDB(dbName, &auth)

	// set the document
	theDoc := doc

	// create an ID
	theId, err := newUUID() //use whatever method you like to generate a uuid

	//The third argument here would be a revision, if you were updating an existing document
	if err != nil {
		fmt.Printf("error: %v\n", err)
	}

	log.Println("Saving to", dbName)

	// save the document
	rev, err := db.Save(theDoc, theId, "")
	//If all is well, rev should contain the revision of the newly created
	//or updated Document

	fmt.Println("Used Session Cookie to authenticate")

	// log details
	log.Println("revision: " + rev)
	log.Println("Error: ", err)

	// return the ID of the document created
	return theId

} // saveDocumentToCouch()

func getThreadId(cookie CookieAuth) []string {

	var timeout = time.Duration(500 * 100000000)
	conn, err := couchdb.NewSSLConnection(couchDBUrl, 443, timeout)

	// get cookie into correct format
	auth := couchdb.CookieAuth{AuthToken: cookie.AuthToken, UpdatedAuthToken: cookie.UpdatedAuthToken}
	db := conn.SelectDB("threads", &auth)

	var rows ThreadRows

	_, err = db.Read("_all_docs", &rows, nil)

	log.Println("Error: ", err)

	idArray := make([]string, rows.Total_rows)

	for i := 0; i < rows.Total_rows; i++ {
		idArray[i] = rows.Rows[i].Id
	}

	return idArray

} // getThreads()

func getThreadHandler(w http.ResponseWriter, r *http.Request) {

	// read all of the bytes from the request body into a byte array
	body, err := ioutil.ReadAll(r.Body)

	// print out JSON
	fmt.Println("JSON: " + string(body))

	// make cookie struct
	var cookie CookieAuth

	// Unmarshal the JSON into the struct
	if err = json.Unmarshal(body, &cookie); err != nil {
		panic(err)
	}

	threadIds := getThreadId(cookie)

	var timeout = time.Duration(500 * 100000000)
	conn, err := couchdb.NewSSLConnection(couchDBUrl, 443, timeout)
	auth := couchdb.BasicAuth{Username: "admin", Password: "Balloon2016"}
	db := conn.SelectDB("threads", &auth)

	var rows ThreadRows

	err = db.ReadMultiple(threadIds, &rows)

	log.Println("Error: ", err)

	threadsArray := make([]Thread, rows.Total_rows)

	for i := 0; i < rows.Total_rows; i++ {
		threadsArray[i] = rows.Rows[i].Doc
	}

	fmt.Println(threadsArray)

	var jsonBytes []byte

	// marshal the struct into json byte array
	jsonBytes, err = json.Marshal(threadsArray)

	// error checks
	if err != nil {
		panic(err)
	}

	// Write content-type, statuscode, payload
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)
	fmt.Fprintf(w, string(jsonBytes))

} // getThreadHandler()
