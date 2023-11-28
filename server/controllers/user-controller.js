import User from "../model/user.js";
import bcrypt from 'bcrypt';
import  jwt  from "jsonwebtoken";
import dotenv from 'dotenv';
import Token from '../model/token.js'

dotenv.config()

export const signupUser = async (request, response) => {
    try{
        const hashedPassword = await bcrypt.hash(request.body.password,10)
        request.body.password = hashedPassword
        const user = request.body
   
        const newUser = new User(user);
        const savedUser = await newUser.save(request);
        return response.status(200).json({msg: 'signup successful'})
    }catch(error){
        console.log(error)
        if (error.code === 11000){
            return response.status(400).json({msg: 'User with this email already exists', code: 11000})
        }
        return response.status(500).json({msg: 'Error while signing up'})
    }
};

export const loginUser =  async(request, response) => {
    const user = await User.findOne({email: request.body.email});
    if (!user){
        return response.status(401).json({message: "Invalid email or password"})
    }
    try{
        const passwordMatch = await bcrypt.compare(request.body.password, user.password)
        if (!passwordMatch){
            return response.status(401).json({message: "Invalid password"})
        }else{
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY,{ expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken = new Token({ token: refreshToken})
            await newToken.save()
            return response.status(200).json({accessToken: accessToken, refreshToken: refreshToken, name:user.name, message:"Login Successful"})
        }
    }catch(error){
        return response.status(500).json({msg:'Error while logging in the user'})
}
};


