import pkg from 'cloudinary';
const { v2: cloudinary } = pkg; // Destructure the v2 from the cloudinary package

import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'NextGen',
    allowed_formats: ['png', 'jpg', 'jpeg'],
  },
});

// Using a default export
export default { cloudinary, storage };
