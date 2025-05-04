```mermaid
sequenceDiagram
participant browser
participant server

Note right of browser: The note page is already loaded
browser->>server: POST new_note
activate server
server->>browser: Status code: 201
deactivate server
```