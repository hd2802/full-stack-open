import { useState } from "react";

import { Form, Button, Navbar } from "react-bootstrap";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const create = (event) => {
    event.preventDefault();

    if (title === "" || author === "" || url === "") {
      return;
    }
    createBlog(title, author, url);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <div>
        <Form onSubmit={create}>
          <Form.Group>
            <Form.Label>
              title:
              <Form.Control
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              author:
              <Form.Control
                type="text"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              url:
              <Form.Control
                type="text"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </Form.Label>
          </Form.Group>
          <Button type="submit">create</Button>
        </Form>
      </div>
    </div>
  );
};

export default BlogForm;
