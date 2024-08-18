package main

import (
	"fmt"
	"net/http"
)

func main() {
	// Serve static files (like index.html)
	http.Handle("/", http.FileServer(http.Dir(".")))

	// Endpoint to return HTML content
	http.HandleFunc("/data", func(w http.ResponseWriter, r *http.Request) {
		// Send back some dynamic HTML content
		fmt.Fprint(w, "<p>This is some dynamically loaded content!</p>")
	})

	// Start the server
	fmt.Println("Server running at http://localhost:3000")
	http.ListenAndServe(":3000", nil)
}
