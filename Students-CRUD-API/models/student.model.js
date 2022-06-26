import mongoose from "mongoose";
import { convertImgToCloudinary } from '../services/convertImgToCloudinary.js';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    gender: {
        type: String
    }
})

studentSchema.pre('save', async function preSaveImgConvert (next) {
    const user = this;
    if(!user.isModified('image') || !user.image) return next();
    try {
        const cloudinaryImage = (await convertImgToCloudinary(user.image)).url;
        console.log(cloudinaryImage)
        if(cloudinaryImage) {
            user.image = cloudinaryImage;
        }
    } catch (error) {
        return next(error)
    }
})

const Student = mongoose.model('student', studentSchema)

export default Student;