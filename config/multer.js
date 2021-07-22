import multer from 'multer';

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, './assets/profile_pictures');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname, req.next)
    }
});

const fileSize = process.env.MAX_FILE_SIZE;

const upload = multer({ storage }, { fileSize: fileSize });

export default upload;