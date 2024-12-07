// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name:{type: String, required:true},
//     email:{type: String, required:true, unique:true},
//     password:{type: String, required:true},
//     cartData:{type: Object, default: {}}, 
// }, {minimize:false})

// const userModel = mongoose.models.user || mongoose.model('user', userSchema)

// export default userModel


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    resetPasswordToken: { type: String }, // Token for password reset
    resetPasswordExpires: { type: Date }, // Expiry time for the reset token
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
