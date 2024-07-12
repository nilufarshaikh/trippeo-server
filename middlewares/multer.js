import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "travel_stories",
    format: async (req, file) => "jpg",
    public_id: (req, file) => file.originalname.split(".")[0],
  },
});

const upload = multer({ storage: storage });

// This code is for testing purpose, needs to be removed later.
// upload.single("image"),
//   (req, res, next) => {
//     console.log(req.file.path);
//     next();
//   };

export default upload;
