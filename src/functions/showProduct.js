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

const teste = async () => {

  const db = await connectToDatabase(process.env.MONGODB_URI)

  const collection = db.collection('products')

  const products = await collection.find()

  console.log(products)

  return products
}

export default teste