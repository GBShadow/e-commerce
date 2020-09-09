exports.handler = async event => {
  const { fistName, lastName } = event.body

  return {
    statusCode: 200,
    body: `${fistName} ${lastName}`
  }
}