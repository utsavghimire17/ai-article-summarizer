import mongoose from 'mongoose';


const Connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@cluster0.b7frgkn.mongodb.net/?retryWrites=true&w=majority`;
    try{
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log("Db connected")
    } catch(error){
        console.log('Db connection error', error)
    }
}
export default Connection;