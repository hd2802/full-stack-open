Use the SuperTest library for writing a test that makes an HTTP GET request to the /api/blogs URL. Verify that the blog list application returns the correct amount of blog posts in the JSON format.

Once the test is finished, refactor the route handler to use the async/await syntax instead of promises.

Notice that you will have to make similar changes to the code that were made in the material, like defining the test environment so that you can write tests that use separate databases.

NB: when you are writing your tests it is better to not execute them all, only execute the ones you are working on. Read more about this here.