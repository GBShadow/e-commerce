exports.handler = async event => {
  const data = event.body

  JSON.parse(data)

  const { firstName, lastName } = data

  return {
    statusCode: 200,
    body: `${fistName} ${lastName}`
  }
}