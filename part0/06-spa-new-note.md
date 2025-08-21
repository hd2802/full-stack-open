```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: Page is already loaded
    browser->>server: POST new note
    activate server
    server-->>browser: Status code: 201 Created
    deactivate server

    Note right of browser: Page renders new note
```