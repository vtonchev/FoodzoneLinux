// const multer = require("multer");
const aws = require("aws-sdk");
// const multerS3 = require("multer-s3");

aws.config.update({
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId
});

const s3 = new aws.S3();

exports.delete_Photo = function(req, res, next){
    if(req.body.key){
        var params = {
            Bucket: "foodzoneuploads", 
            Key: req.body.key
        };
        s3.deleteObject(params, function(err, data) {
            if (err){
                console.log('an error appeared the image isnt deleted')
            } else {
                console.log('the image is deleted');
                next();
            }               
        });
    } else {
        console.log('no reqest.body')
        next()
    }
}
