import multer from "multer";

const storage = () => {
  return multer.diskStorage({
    destination: `./public/uploads`,
    filename: (req, file, cb) => {
      let filename = file.originalname.replace(/\s/g, "").toLowerCase();
      cb(null, filename);
    },
  });
};

const maxSize: number = 1024 * 1024 * 5;

const fileFilter = (req: any, file: { mimetype: string }, cb: (arg0: null, arg1: boolean) => void) => {
  if (!file.mimetype.includes("jpeg") && !file.mimetype.includes("png") && !file.mimetype.includes("jpg")) {
    return cb(null, false);
  }
  cb(null, true);
};

export const uploads = () => {
  return multer({
    storage: storage(),
    limits: { fileSize: maxSize },
    fileFilter: fileFilter,
  });
};
