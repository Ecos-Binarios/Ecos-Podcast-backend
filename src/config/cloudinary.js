import { v2 as cloudinary } from "cloudinary";
import Randomstring from "randomstring";
import dotenv from "dotenv";
dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: false
})

export const uploadFile = (file) => {
    return cloudinary.uploader.upload(file.tempFilePath,
         { folder: "ecospodcast", public_id: Randomstring.generate(15), resource_type: "auto" },
    );
}

export const deleteAudio = (public_id) => {
    return cloudinary.uploader.destroy(public_id, { resource_type: "video" });
}


export const deleteImage = (public_id) => {
    return cloudinary.uploader.destroy(public_id, { resource_type: "image" });
}