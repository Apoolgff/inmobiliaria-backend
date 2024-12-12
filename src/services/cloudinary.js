const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'db6gg6z8u',
    api_key: '985737534827456',
    api_secret: 'RtmaZu6bzFHJ6q_ckEFjVWbPbgM',
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'ImagenesPublicaciones',
        allowed_formats: ['jpeg', 'png', 'jpg', 'webp'],
    },
});

const upload = multer({ storage });

module.exports = { upload };
