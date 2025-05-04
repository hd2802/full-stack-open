``` mermaid
sequenceDiagram
participant browser
participant server

Note right of browser: The "notes" page is already rendered

browser -->> server: POST new_note_content
activate server
server -->> browser: Status code: 302
deactivate server

Note right of browser: "notes" page is reloaded

browser -->> server: GET /exampleapp/notes
activate server
server -->> browser: HTML document
deactivate server

browser -->> server: GET /exampleapp/main.css
activate server
server -->> browser: CSS file
deactivate server

browser -->> server: GET /exampleapp/main.js
activate server
server -->> browser: JS file
deactivate server

browser -->> server: GET /exampleapp/data.json
activate server
server -->> browser: JSON file
deactivate server

```
