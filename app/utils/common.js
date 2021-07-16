/* eslint-disable no-buffer-constructor */
/* eslint-disable prefer-promise-reject-errors */

const aws = require('aws-sdk');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
});
const s3 = new aws.S3();

const checkAcceptableImage = (type) => {
  const acceptableImageTypes = ['png', 'jpeg', 'jpg'];
  if (acceptableImageTypes.includes(type)) return true;
  return false;
};

const uploadBase64Image = (file) => new Promise((resolve, reject) => {
  if (file) {
    const base64Data = new Buffer(
      file.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );
    const type = file.split(';')[0].split('/')[1];
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: `${Date.now().toString()}.${type}`,
      Body: base64Data,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: `image/${type}`,
    };
    if (checkAcceptableImage(type)) {
      s3.upload(params, (err, data) => {
        if (err) {
          reject({ success: false, message: err });
        }
        resolve(data);
      });
    } else {
      reject(new Error('Invalid image type.'));
    }
  } else {
    reject(new Error('Please send the file.'));
  }
});

module.exports = {
  uploadBase64Image,
};
