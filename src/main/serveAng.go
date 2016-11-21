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
	Id         int
	ThreadId   int
	Body       string
	AuthorId   string
	AuthorName string
}

type Posts struct {
	Posts []Post
}

type ThreadPosts struct {
	ThreadId int
	Posts    []Post
}

/*
   To get routing to work in the angular app, the index.html file needs to be served
   everytime a route is entered into the address bar. This lets angular 2 handle the routing
   instead of Go. In doing this, I ran into the problem of Go returning js files as html.
   To solve this (after many many hours) I used some code from the answer on this post
   Link: http://stackoverflow.com/questions/14086063/serve-homepage-and-static-content-from-root
*/

// for serving angular resources (all angular app files needed)
var chttp = http.NewServeMux()

type Thread struct {
	Title  string
	Id     string
	Author string
	Body   string
	Tags   []string
}

func main() {

	// test POST Request
	var t Post

	t.Id = 1234
	t.ThreadId = 1
	t.Body = "This is the first proper test. Please work thank you, have a nice day."
	t.AuthorId = "123"
	t.AuthorName = "Me"

	//"https://couchdb-e195fb.smileupps.com/posts/_design/post/_update/addPost/a6df9fd5-3aaa-4cb8-b08f-b4daa83d406b"

	// send the Post request to couch, get the response and then close the response body
	resp := sendPostRequestToCouch("https://couchdb-e195fb.smileupps.com/posts/_design/post/_update/addPost/a6df9fd5-3aaa-4cb8-b08f-b4daa83d406b", t)
	defer resp.Body.Close()

	fmt.Println("response Status:", resp.Status)
	fmt.Println("response Headers:", resp.Header)

	// read the bytes from the response body of POST request
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Println("response Body:", string(body))
	fmt.Println("Done.")

	//testing thread stuff
	/*	testThread := Thread{Id: "1", Title: "Title", Author: "Martin", Body: "my thread body", Tags: []string{"tag1", "tag2"}}

		log.Println("Doc sent to G0")
		log.Println(testThread.Title)
		log.Println(testThread.Author)
		log.Println(testThread.Body)
		log.Println(testThread.Id)
		log.Println(testThread.Tags)
		log.Println()

		saveThread(testThread)*/
	//end thread testing

	// handle for serving resource
	chttp.Handle("/", http.FileServer(http.Dir("./angular")))

	// handle serving index.html at root
	http.HandleFunc("/", homeHandler)

	// handler for saving posts made by user to couchDB
	http.HandleFunc("/api/savePost", savePostHandler)

	// give the user feedback
	fmt.Println("Listening on port 8080")

	// listen on port and handle connections
	http.ListenAndServe(":8080", nil)

} // main()

// handler for root address
func homeHandler(w http.ResponseWriter, r *http.Request) {

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

// handler for saving posts to couchDB
func savePostHandler(w http.ResponseWriter, r *http.Request) {

	// read all of the bytes from the request body into a byte array
	body, err := ioutil.ReadAll(r.Body)

	// print out JSON
	fmt.Println("JSON: " + string(body))

	// make post struct
	//var post Post
	var post Post

	// Unmarshal the JSON into the struct
	if err = json.Unmarshal(body, &post); err != nil {
		panic(err)
	}

	// print out details
	// fmt.Println("Post Id:", post.Id)
	// fmt.Println("Post ThreadId:", post.ThreadId)
	// fmt.Println("Post Body:", post.Body)
	// fmt.Println("Post AuthorId:", post.AuthorId)
	// fmt.Println("Post AuthorName:", post.AuthorName)

	// save the post to couchDB
	//saveDocumentToCouch(threadPosts, "posts")

} // savePostHandler()

func readPost() {

	var timeout = time.Duration(500 * 100000000)
	conn, err := couchdb.NewSSLConnection("couchdb-e195fb.smileupps.com", 443, timeout)
	auth := couchdb.BasicAuth{Username: "admin", Password: "Balloon2016"}
	db := conn.SelectDB("posts", &auth)

	var posts interface{}

	_, err = db.Read("_all_docs", &posts, nil)

	log.Println("Error: ", err)

	fmt.Println(posts)

} // readPost()

func addPost() {

	var timeout = time.Duration(500 * 100000000)
	conn, err := couchdb.NewSSLConnection("couchdb-e195fb.smileupps.com", 443, timeout)
	auth := couchdb.BasicAuth{Username: "admin", Password: "Balloon2016"}
	db := conn.SelectDB("posts", &auth)

	var posts ThreadPosts
	//posts.post

	_, err = db.Read("a7d82b06-1e9e-4316-978b-cc399552106a", &posts, nil)

	log.Println("Error: ", err)

	fmt.Println(posts)

} // addPost()

func sendPostRequestToCouch(theUrl string, doc interface{}) (*http.Response) {

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

} // sendPostRequestToCouch()

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

func saveThread(t Thread) {
	var timeout = time.Duration(500 * 100000000)
	conn, err := couchdb.NewSSLConnection("couchdb-e195fb.smileupps.com", 443, timeout)
	auth := couchdb.BasicAuth{Username: "admin", Password: "Balloon2016"}
	db := conn.SelectDB("threads", &auth)

	/*log.Println(t.title)
	log.Println(t.author)
	log.Println(t.body)
	log.Println(t.id)
	log.Println(t.tags)*/

	theDoc := Thread{
		Title:  t.Title,
		Id:     t.Id,
		Author: t.Author,
		Body:   t.Body,
		Tags:   t.Tags,
		//title: "My remote thread",
	}

	log.Println("Doc sent to Couch")
	log.Println(theDoc.Title)
	log.Println(theDoc.Author)
	log.Println(theDoc.Body)
	log.Println(theDoc.Id)
	log.Println(theDoc.Tags)
	log.Println()

	theId, err := newUUID() //use whatever method you like to generate a uuid
	//The third argument here would be a revision, if you were updating an existing document
	if err != nil {
		fmt.Printf("error: %v\n", err)
	}
	log.Println("Saving Thread")
	rev, err := db.Save(theDoc, theId, "")
	//If all is well, rev should contain the revision of the newly created
	//or updated Document

	log.Println("revision: " + rev)
	log.Println("Error: ", err)

}

// generic function to save a document to couchDB
// parameters are, the doc, (eg struct made for documents) and the name of DB as a string
func saveDocumentToCouch(doc interface{}, dbName string) {

	// set timeout
	var timeout = time.Duration(500 * 100000000)

	// create the connect to couchDB
	conn, err := couchdb.NewSSLConnection("couchdb-e195fb.smileupps.com", 443, timeout)

	// set authentication
	auth := couchdb.BasicAuth{Username: "admin", Password: "Balloon2016"}

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

	// log details
	log.Println("revision: " + rev)
	log.Println("Error: ", err)

} // saveDocumentToCouch()

// generic function to save a document to couchDB
// parameters are, the doc, (eg struct made for documents) and the name of DB as a string
func updateDocumentInCouch(id string, doc interface{}, dbName string) {

	// set timeout
	var timeout = time.Duration(500 * 100000000)

	// create the connect to couchDB
	conn, err := couchdb.NewSSLConnection("couchdb-e195fb.smileupps.com", 443, timeout)

	// set authentication
	auth := couchdb.BasicAuth{Username: "admin", Password: "Balloon2016"}

	// select the DB to save to
	db := conn.SelectDB(dbName, &auth)

	var dat map[string]interface{}

	_, err = db.Read(id, &dat, nil)

	var revNo = dat["_rev"].(string)
	var theId = dat["_id"].(string)

	fmt.Println(revNo)

	// set the document
	theDoc := doc

	// create an ID
	//theId, err := newUUID() //use whatever method you like to generate a uuid

	//The third argument here would be a revision, if you were updating an existing document
	if err != nil {
		fmt.Printf("error: %v\n", err)
	}

	log.Println("Saving to", dbName)

	// save the document
	rev, err := db.Save(theDoc, theId, revNo)
	//If all is well, rev should contain the revision of the newly created
	//or updated Document

	// log details
	log.Println("revision: " + rev)
	log.Println("Error: ", err)

} // saveDocumentToCouch()

func savePost() {

}
