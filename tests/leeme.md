# About tests

There are two ways to run test:

- The first one is using a mongo test database. That means that before the test run, a full mongo database with seeds is created. This database is then used to run the tests. These tests use files called `\*.db.test.js`. To run these tests use:

  ```bash
  npm run start:test
  ```

  NOTE: You can't to run these tests while app is running

- The second is through a mock database, using the _mongo-memory server_. These test use files called `\*.memory.test.js`. To run these test use:

  ```bash
  npm run test
  ```
