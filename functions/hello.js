exports.handler = async (event, context, callback) => {
  const data = JSON.parse(event.body)
  const type = event.httpMethod

  const { firstName, lastName } = data

  callback (null, {
    statusCode: 200,
    body: `${firstName}, ${lastName} POST ? ${type}`
  })
}