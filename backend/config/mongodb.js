import mongoose from "mongoose";

const connectDB = async () =>{
    // whenever the mongodb database is established, this function is carried out
     mongoose.connection.on('connected', ()=>{
        console.log('DB Connected')
     })
// this establishes the datbase connection
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)
}

export default connectDB