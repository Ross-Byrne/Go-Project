// Copyright 2010 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"net/http"
)

func main(){
    http.HandleFunc("/", serveHome)
    http.HandleFunc("/contact", serveContact)
    http.ListenAndServe(":8080",nil)
}

func serveHome(w http.ResponseWriter, r *http.Request){
    w.Write([]byte("HELLO WORLD!"))
}

func serveContact(w http.ResponseWriter, r *http.Request){
    w.Write([]byte("HELLO WORLD! this is a contact page"))
}