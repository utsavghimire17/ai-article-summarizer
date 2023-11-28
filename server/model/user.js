import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    history: [
    {
        content: String,
        summary: String
    }
    ]
})

const User = mongoose.model('user', userSchema);

export default User