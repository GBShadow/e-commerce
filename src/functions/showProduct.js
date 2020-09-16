const co = require('co');
const mongoose = require('mongoose');

let conn = null;

const uri = 'mongodb+srv://gbshadow:gbs.123@cluster0.bsxsb.mongodb.net/stock?retryWrites=true&w=majority';

exports.handler = function(event, context, callback) {

  context.callbackWaitsForEmptyEventLoop = false;

  const params = event.queryStringParameters
  run().
    then(res => {
      callback(null, res);
    }).
    catch(error => callback(error));
};

function run() {
  return co(function*() {

    if (conn == null) {
      conn = yield mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
        bufferMaxEntries: 0
      });
      conn.model('products', new mongoose.Schema({
        id: String,
        title: String,
        price: Number,
        description: String,
        image: String,
      }));
    }

    const M = conn.model('products');

    const doc = yield M.findOne({ _id: "5f6197698666d4000827ff8b"});
    const response = {
      statusCode: 200,
      body: JSON.stringify(doc)
    };
    return response;
  });
}
