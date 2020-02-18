const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

aws.config.update({
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId
});

const s3 = new aws.S3();

const deletePhoto =  s3.deleteObject({  
 Bucket: MY_BUCKET, 
 Key: photo.key
},function (err, data, next){
    if(err){
        console.log(err)
    } else {
        next();
    }
})

module.exports = deletePhoto;