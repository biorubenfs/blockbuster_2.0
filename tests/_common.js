// import { MongoMemoryServer } from "mongodb-memory-server";
// import mongoose from "mongoose";

// /* connect, disconnect and restart mongo/mongoose */
// export const mongo = {
//     mongod: null,
//     async before() {
//         mongod = await MongoMemoryServer.create();
//     },
//     async beforeEach() {
//         await mongoose.connection.db.dropDatabase;
//     },
//     async after() {
//         await mongoose.connection.close;
//         await 
//     };
// }