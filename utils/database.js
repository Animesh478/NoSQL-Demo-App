const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = async function (callback) {
  try {
    const client = await MongoClient.connect(process.env.URI);
    _db = client.db();
    // after the connection to the database server is complete, the backend server starts listening for requests
    callback();
  } catch (error) {
    console.log(error);
  }
};

const dbConnect = function () {
  if (_db) {
    return _db;
  }
  throw "No database connected";
};

module.exports = {
  mongoConnect,
  dbConnect,
};
