exports.handler = async (event, context, callback) => {
  const data = event.body

  JSON.parse(data)

  const { firstName, lastName } = data

  callback ({
    statusCode: 200,
    body: JSON.stringify({ firstName, lastName})
  })
}