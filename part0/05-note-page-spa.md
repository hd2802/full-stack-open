``` mermaid
sequenceDiagram
participant browser
participant server

browser --> GET https://studies.cs.helsinki.fi/exampleapp/spa
activate server
server --> browser: HTML file
deactivate server

browser -->> GET https://studies.cs.helsinki.fi/exampleapp/main.css
activate server
server-->> css file
deactivate server

browser -->> GET https://studies.cs.helsinki.fi/exampleapp/spa.js
activate server
server-->> js file
deactivate server

browser -->> GET https://studies.cs.helsinki.fi/exampleapp/data.json
activate server
server -->> json file
deactivate server

```
