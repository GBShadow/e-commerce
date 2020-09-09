exports.handler = async (event, context, callback) => {
  const type = event.httpMethod

  callback (null, {
    statusCode: 200,
    body: ` Get ? ${type}`
  })
}