``` mermaid
sequenceDiagram
participant browser
participant server

Note right of browser: The "notes" page is already rendered

browser --> POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
activate server
server --> browser: Status code: 201
deactivate server


```