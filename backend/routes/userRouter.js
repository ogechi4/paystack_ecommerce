import express from "express"

import { loginUser,registerUser, verifyUser, adminLogin,requestPasswordReset,resetPassword } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.post('/tokenVerify', verifyUser)
userRouter.post("/forgotPassword", requestPasswordReset)
userRouter.post("/resetPassword/:token", resetPassword)

export default userRouter