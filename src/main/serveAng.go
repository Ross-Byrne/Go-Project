package main

import (
	"crypto/rand"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"
	"github.com/rhinoman/couchdb-go"
	"encoding/json"
	"io/ioutil"
	"strings"
)

type Post struct {
	Id int
	ThreadId int
	Body string
	AuthorId string
	AuthorName string
}

type ThreadPosts struct {
	ThreadId int
	Posts []Post
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

	body, err := ioutil.ReadAll(r.Body)

	fmt.Println("JSON: " + string(body))
	//var dat map[string]interface{}
	var post Post

	if err = json.Unmarshal(body, &post); err != nil {
		panic(err)
	}
	fmt.Println("Post Id:", post.Id)
	fmt.Println("Post ThreadId:", post.ThreadId)
	fmt.Println("Post Body:", post.Body)
	fmt.Println("Post AuthorId:", post.AuthorId)
	fmt.Println("Post AuthorName:", post.AuthorName)
	// fmt.Println(dat)
	//
	// 	num := dat["message"]
	// 	fmt.Println(num)

} // savePostHandler()

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
