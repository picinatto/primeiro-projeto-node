// Use path to avoid issues with dirs on different OS
import path from 'path';
// Import crypto to use the randon hash generator
import crypto from 'crypto';
// Import multer for configuring the file upload storage
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,
  // Create the storage object that will hold information
  // about where to store and with which name
  storage: multer.diskStorage({
    // Use path to get safely the temp folder location
    destination: tmpFolder,
    // Use the filename to configure with which name the file
    // will be stored on the destination
    filename(request, file, callback) {
      // Create a hash to generate a unique string
      const fileHash = crypto.randomBytes(10).toString('HEX');
      // Get the original file name uploaded by the user
      const fileName = `${fileHash}-${file.originalname}`;
      // return the call back with error:null and FileName
      return callback(null, fileName);
    },
  }),
};
