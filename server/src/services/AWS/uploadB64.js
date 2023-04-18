import AWS from "aws-sdk"
import multer from "multer"
import multerS3 from "multer-s3"

import config from "../../config.js"

AWS.config.update({
  accessKeyId: config.awsAccess.key,
  secretAccessKey: config.awsSecret.key,
  region: "us-east-2"
})

const s3 = new AWS.S3()

export const uploadB64 = async (base64) => {
  const key = `${Math.floor(Math.random() * 100000000000)}.jpeg`
  const buf = Buffer.from(base64, 'base64')
  const data = {
    Key: key,
    Bucket: process.env.S3_BUCKET_PRODUCTION,
    ACL: 'public-read',
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg'
  }

  await s3.putObject(data, function (err, data) {
    if (err) {
      console.log(err);
      console.log('Error uploading data: ', data);
    }
  }).promise()

  const url = `https://${process.env.S3_BUCKET_PRODUCTION}.s3.us-east-2.amazonaws.com/${key}`
  return url
}