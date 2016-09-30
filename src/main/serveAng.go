
// file mux_ex.go
package main

import (
 //"log"
 "fmt"
 "net/http"
 "strings"
 //"github.com/gorilla/mux"
)

/*func main() {
  r := mux.NewRouter()
  r.PathPrefix("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir("angular/"))))

  http.Handle("/", r)

  log.Println("Listening at port 3000")
  http.ListenAndServe(":3000", nil)

}*/



var chttp = http.NewServeMux()

func main() {

    chttp.Handle("/", http.FileServer(http.Dir("./angular")))

    http.HandleFunc("/", HomeHandler) // homepage

    fmt.Println("Listening on port 8080")

    http.ListenAndServe(":8080", nil)
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {

    if (strings.Contains(r.URL.Path, ".")) {
        fmt.Println("Say what now?")
        chttp.ServeHTTP(w, r)
    } else {
        http.ServeFile(w, r, "angular/index.html")
        fmt.Println("Serve index.html")
    }
}
