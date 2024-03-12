import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

type FileNameCallback = (error: Error | null, filename: string) => void

export const multerConfig = {
    storage: multer.diskStorage({
        destination: 'uploads/',
        filename: function (req: Request, file: Express.Multer.File, cb: FileNameCallback) {
            console.info(file.originalname);
            cb(null, file.originalname);
        }
    }),
    limits: {
        fileSize: 1024 * 1024 * 20
    },

    fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        if (req.file?.mimetype === "image/jpeg" || req.file?.mimetype === "image/png" || req.file?.mimetype === "image/jpg") {
            return cb(null, false);
        }
        cb(null, true);
    }
}