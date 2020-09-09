exports.handler = async (event, context, callback) => {
  const data = JSON.parse(event.body)

  const { firstName, lastName } = data

  callback (null, {
    statusCode: 200,
    body: JSON.stringify({ firstName, lastName })
  })
}