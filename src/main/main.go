// Copyright 2010 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"net/http"
    "github.com/gorilla/mux"
)

func main(){
    serveWeb()
}

func serveWeb(){
    
    gorillaRoute:= mux.NewRouter()
    
    gorillaRoute.HandleFunc("/", serveContact)
    gorillaRoute.HandleFunc("/{page_alias}", serveContact)
    
    http.Handle("/", gorillaRoute)
    http.ListenAndServe(":8080",nil)
}

func serveContact(w http.ResponseWriter, r *http.Request){
    urlParams := mux.Vars(r)
    page_alias := urlParams["page_alias"]
    
    if(page_alias == ""){
        page_alias = "home"
    }
    
    w.Write([]byte("HELLO WORLD! "+ page_alias ))
}