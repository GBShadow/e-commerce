const co = require('co');
const mongoose = require('mongoose');

let conn = null;

const uri = 'mongodb+srv://gbshadow:gbs.123@cluster0.bsxsb.mongodb.net/stock?retryWrites=true&w=majority';

exports.handler = function(event, context, callback) {

  context.callbackWaitsForEmptyEventLoop = false;

  const params = event.queryStringParameters.id

  run(params).
    then(res => {
      callback(null, res);
    }).
    catch(error => callback(error));
};

function run(params) {
 
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

    const doc = yield M.findOne({ _id: params });
    const response = {
      statusCode: 200,
      body: JSON.stringify(doc)
    };
    return response;
  });
}
