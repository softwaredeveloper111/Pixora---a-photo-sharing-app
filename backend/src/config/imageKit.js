const  ImageKit = require('@imagekit/nodejs');
const {toFile} = require("@imagekit/nodejs");
const config = require("../config/config")





const client = new ImageKit({
  privateKey: config.IMAGEKIT_PUBLIC_KEY
});




const uploadImageToImageKit = async (buffer) => {
  
 const result =  await client.files.upload({
  file: await toFile(Buffer.from(buffer), 'file'),
  fileName: `${Date.now()}-file`,
  folder:"instagram-clone"
});



return result;

}


module.exports = uploadImageToImageKit