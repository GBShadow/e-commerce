const { MongoClient } = require('mongodb')
const url = require('url')

let cachedDb = null

async function connectToDatabase(uri) {
  if(cachedDb) {
    return cachedDb
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const dbName = url.parse(uri).pathname.substr(1)
  
  const db = client.db(dbName)

  cachedDb = db

  return db
}

exports.handler = async () => {

  const db = await connectToDatabase(process.env.MONGODB_URI)

  const collection = await db.collection('products')

  const products = await collection.find()

  return {
    statusCode: 200,
    body: JSON.stringify({products})
  }
}