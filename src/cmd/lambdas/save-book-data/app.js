var AWS = require('aws-sdk')

const { uuid } = require('uuidv4')

AWS.config.update({
  region: 'eu-west-1'
})

var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })

let response

/**
 * Save Book Data
 */
exports.lambdaHandler = async (event, context) => {
  const filename = event.Records[0].s3.Object.key

  const id = uuid()

  const dynamoDBParams = {
    TableName: process.env.BooksDbTableName,
    Item: {
      id: { S: id },
      filename: { S: filename }
    }
  }

  console.log('adding new book with name ' + filename)
  try {
    await ddb.putItem(dynamoDBParams).promise()
    response = {
      statusCode: 200,
      body: 'file added!'
    }
  } catch (err) {
    response = {
      statusCode: 500,
      body: err.message
    }
  }

  return response
}
