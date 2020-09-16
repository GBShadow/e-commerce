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

exports.handler = async (event, context, callback) => {

  const db = await connectToDatabase(process.env.MONGODB_URI)

  const collection = db.collection('products')

  const product = {
    title: "Tênis VR Caminhada Confortável Detalhes Couro Masculino",
    price: 139.9,
    description: "Os “dad shoes” foram desenvolvidos originalmente com a performance em mente: sola robusta para amortecimento extra, silhueta corpulenta para suporte e conforto, e nenhum cuidado com a aparência. Afinal, eles eram direcionados aos corredores, e não aos Sneakerheads. Porém, após passar por algumas adaptações, o estilo ultrapassado renasceu em diversos modelos que conquistaram a simpatia das celebridades, iniciando uma forte tendência. Nesse sentido, a nova silhueta da 3 Stripes celebra as tendências da moda que se popularizaram juntamente com a Dance Music dos anos 90. Desse modo, o Falcon resgata o espírito descontraído e rebelde da época ao mesmo tempo em que oferece conforto duradouro para o dia a dia.",
    image: "https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg"
  }

  await collection.insertOne(product)

  callback (null, {
    statusCode: 201,
    body: JSON.parse(product)
  })
}