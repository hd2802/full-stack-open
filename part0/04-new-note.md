``` mermaid
sequenceDiagram
participant browser
participant server

Note right of browser: The "notes" page is already rendered

browser-->>server: POST new_note_content
activate server
server-->>browser: Status code: 302
deactivate server

Note right of browser: "notes" page is reloaded

browser-->> GET https://studies.cs.helsinki.fi/exampleapp/notes
activate server
server-->> HTML document 
deactivate server

browser-->> GET https://studies.cs.helsinki.fi/exampleapp/main.css
activate server
server-->> css file
deactivate server

browser -->> GET https://studies.cs.helsinki.fi/exampleapp/main.js
activate server
server-->> js file
deactivate server

browser -->> GET https://studies.cs.helsinki.fi/exampleapp/data.json
activate server
server -->> json file
deactivate server


```