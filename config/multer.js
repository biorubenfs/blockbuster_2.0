import multer from 'multer';

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, './assets/profile_pictures');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname, req.next)
    }
})

const upload = multer({ storage });

export default upload;