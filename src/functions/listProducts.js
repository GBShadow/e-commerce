const { MongoClient } = require("mongodb");
const url = require("url");

let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const dbName = url.parse(uri).pathname.substr(1);

  const db = client.db(dbName);

  cachedDb = db;

  return db;
}

const db = await connectToDatabase(process.env.MONGODB_URI);
module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase(process.env.MONGODB_URI).then(() => {
    const collection = db.collection("products");
    collection
      .find()
      .then((products) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(products),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the products.",
        })
      );
  });
};
