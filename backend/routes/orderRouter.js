import  express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

import {placeOrder,placeOrderStack, allOrders,userOrders,updateStatus,verifyPaystack} from '../controllers/orderController.js'

const orderRouter = express.Router()

orderRouter.post('/list',adminAuth, allOrders)
orderRouter.post('/status',adminAuth, updateStatus)

orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/paystack',authUser, placeOrderStack)

orderRouter.post('/userorders',authUser, userOrders)

// verify payment
orderRouter.post('/verifyPaystack', authUser, verifyPaystack )

export default orderRouter