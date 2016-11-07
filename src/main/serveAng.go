package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

type message_Struct struct {
	message string
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

func main() {

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

	var dat map[string]interface{}

	if err = json.Unmarshal(body, &dat); err != nil {
		panic(err)
	}
	fmt.Println(dat)

		num := dat["message"]
		fmt.Println(num)

} // homeHandler()
