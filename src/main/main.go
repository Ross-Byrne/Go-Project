// Copyright 2010 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"net/http"
    "github.com/gorilla/mux"
    "text/template"
    "os"
    "log"
    "bufio"
    "strings"
    "github.com/rhinoman/couchdb-go"
    "time"
    "crypto/rand"
	"fmt"
	"io"
)
type TestDocument struct {
    Title string
    Note string
}

func main(){
    serveWeb()
}

var themeName = getThemeName()
var staticPages = populateStaticPages()

func serveWeb(){
    gorillaRoute:= mux.NewRouter() 
    
    gorillaRoute.HandleFunc("/", serveContact)
    gorillaRoute.HandleFunc("/{page_alias}", serveContact)
    
    http.HandleFunc("/img/", serveResource)
    http.HandleFunc("/css/", serveResource)
    http.HandleFunc("/js/", serveResource)
    
    http.Handle("/", gorillaRoute)
    http.ListenAndServe(":8080",nil)
}

func couchdbSave(){
    var timeout = time.Duration(500 * 100000000)
    conn, err := couchdb.NewConnection("127.0.0.1",5985,timeout)
    auth := couchdb.BasicAuth{Username: "Manus", Password: "manus" }
    db := conn.SelectDB("manus", &auth)

    theDoc := TestDocument{
        Title: "My Document",
        Note: "This is a note",
    }

    theId, err :=newUUID() //use whatever method you like to generate a uuid
    //The third argument here would be a revision, if you were updating an existing document
    if err != nil {
		fmt.Printf("error: %v\n", err)
	}
    rev, err := db.Save(theDoc, theId, "")  
    //If all is well, rev should contain the revision of the newly created
    //or updated Document
    
    log.Println(rev)
    log.Println(err)
    
}

func serveContact(w http.ResponseWriter, r *http.Request){
    urlParams := mux.Vars(r)
    page_alias := urlParams["page_alias"]
    
    if page_alias == "" {
        page_alias = "home"
    }
    
    staticPage := staticPages.Lookup(page_alias+".html")
    if staticPage==nil{
        staticPage = staticPages.Lookup("404.html")
        w.WriteHeader(404)
    }
    staticPage.Execute(w,nil)
}

func getThemeName() string{
    return "resources"
}

func populateStaticPages() *template.Template{
    result :=template.New("templates")
    templatePaths := new([]string)
    
    basePath :="pages"
    templateFolder, _:= os.Open(basePath)
    defer templateFolder.Close()
    templatePathsRaw, _ := templateFolder.Readdir(-1)
    
    for _, pathInfo := range templatePathsRaw{
        log.Println(pathInfo.Name())
        *templatePaths = append(*templatePaths,basePath+"/"+ pathInfo.Name())
    }
    
    result.ParseFiles(*templatePaths...)
    return result
}

func serveResource(w http.ResponseWriter, req *http.Request){
    path := "public/"+themeName +req.URL.Path
    var contentType string
    
    if strings.HasSuffix(path,".css"){
        contentType = "text/css; charset=utf-8"
    }else if strings.HasSuffix(path,".png"){
        contentType = "image/png; charse=utf-8"
    }else if strings.HasSuffix(path,".jpg"){
        contentType = "image/jpg; charset=utf-8"
    }else if strings.HasSuffix(path,".js"){
        contentType = "application/javascript; charset=utf-8"
    }else{
        contentType = "text/plain; charset=utf-8"
    }
    
    log.Println(path)
    f, err :=os.Open(path)
    if err== nil{
        defer f.Close()
        w.Header().Add("Content-Type",contentType)
        br :=bufio.NewReader(f)
        br.WriteTo(w)
    }else {
        w.WriteHeader(404)
    }
    
}


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