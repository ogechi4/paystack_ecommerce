import express from "express"

import { loginUser,registerUser, verifyUser, adminLogin } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.post('/tokenVerify', verifyUser)

export default userRouter