const AWS = require('aws-sdk')

const s3 = new AWS.S3()

let response

/**
 * Upload Request
 */
exports.lambdaHandler = async (event, context) => {
  const body = JSON.parse(event.body)

  const s3Params = {
    Bucket: 'books-example-bucket-2020',
    ACL: 'private',
    Key: body.file_name,
    ContentType: body.mime_type
  }

  const uploadUrl = s3.getSignedUrl('putObject', s3Params)

  try {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        uploadUrl: uploadUrl
      })
    }
  } catch (err) {
    response = {
      statusCode: 500,
      body: err.message
    }
  }

  return response
}
