There are two ways to run test:

- The first one is using a mongo test database. That means that before the test run, a full mongo database with seeds is created. This database is then used to run the test. To run these test use npm run start:test. These test use files called \*.db.test.js.

- The second is through a mock database, using the mongo-memory server. To run these test npm run test. These test use files called \*.memory.test.js.
