import multer, { Multer, StorageEngine } from 'multer';
import fs from 'fs';

// Define the directories
const directories: string[] = ['./uploads', './uploads/flyers'];

// Check and create the directories that don't exist
directories.map((dir) => !fs.existsSync(dir) && fs.mkdirSync(dir));

const getFileExtension = (name: string): string => {
    if (name.split(".").length > 1)
        return name.substring(name.lastIndexOf("."));

    return "";
}

const generateFileName = (file: Express.Multer.File, optionalPrefix?: string): string => {
    let postfix: string = Date.now() + getFileExtension(file.originalname);

    if(optionalPrefix)
        return `${optionalPrefix}_${postfix}`;

    return `${file.fieldname}_${postfix}`;
}

const flyerStorage: StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./uploads/flyers"),
    filename: (req, file, cb) => cb(null, generateFileName(file, 'flyer')),
});

export const flyerUpload: Multer = multer({ storage: flyerStorage });
