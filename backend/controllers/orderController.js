  import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Paystack from "paystack-api"
import tempOrderModel from "../models/tempOrderModel.js"

// global variables
const currency = 'NGN'
const deliveryCharge = 100

// gateway initialize
 const paystack = new Paystack(process.env.STACK_SECRET_KEY)

// placing orders using cash on delivery method

const placeOrder = async (req,res) =>{
        try {
            
            const {userId, items, amount,address} = req.body

            const orderData ={
                userId,
                items,
                address,
                amount,
                paymentMethod:"COD",
                payment:false,
                date: Date.now()
            }

            const newOrder = new orderModel(orderData)
            await newOrder.save()

            await userModel.findByIdAndUpdate(userId,{cartData:{}})

            res.json({success:true, message:"Order Placed"})
        } catch (error) {
            console.log(error)
            res.json({success:false, message:error.message})
        }
}

// place order via paystack
const placeOrderStack = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const { email } = address;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Paystack",
            payment: false,
            date: Date.now()
        }

        // Save order in database
        // const newOrder = new orderModel(orderData)
        // await newOrder.save()

           // Save order temporarily in TempOrderModel
           const tempOrder = new tempOrderModel(orderData);
           await tempOrder.save();


         const paystackResponse = await paystack.transaction.initialize({
            email: email,  // Customer email (from your user data)
           amount: amount * 100,   // Convert amount to kobo (smallest currency unit)
                        // 
          callback_url: `${origin}/verify?success=true&orderId=${tempOrder._id}&userId=${userId}`,
          cancel_action: `${origin}/verify?success=false&orderId=${tempOrder._id}&userId=${userId}`
      });

      if (paystackResponse.status && paystackResponse.data.authorization_url) {
              res.json({ success: true, session_url: paystackResponse.data.authorization_url });
                } else {
             res.json({ success: false, message: "Failed to initialize Paystack transaction." });
        }

    } catch (error) {
        console.log("Error initializing Paystack transaction:", error);
        res.json({ success: false, message: error.message });
    }
    }


// Verify Paystack

const verifyPaystack = async (req, res) => {


    const { orderId, success, userId } = req.body
          
    try {
        if (success === "true") {
            // Fetch the temporary order
            const tempOrder = await tempOrderModel.findById(orderId);
            if (!tempOrder) {
                return res.json({ success: false, message: "Order not found." });
            }

            // Move temp order to main order collection
            const newOrder = new orderModel({
                userId: tempOrder.userId,
                items: tempOrder.items,
                address: tempOrder.address,
                amount: tempOrder.amount,
                paymentMethod: "Paystack",
                payment: true, // Payment verified
                date: tempOrder.date
            });

            console.log("New order before save:", newOrder); // Debugging line

            await newOrder.save();
            

            // Clear user's cart and delete temp order
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            await tempOrderModel.findByIdAndDelete(orderId);

            res.json({ success: true, message: "Payment verified and order confirmed." });
        } else {
            await tempOrderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment verification failed. Order canceled." });
        }
    } catch (error) {
        console.log("Error in verifyPaystack:", error);
        res.json({ success: false, message: error.message });
    }
         



    // try {
    //     if(success === "true"){ 
    //         console.log("entered true")
    //         await orderModel.findByIdAndUpdate(orderId, {payment:true})
    //         await userModel.findByIdAndUpdate(userId, {cartData:{}}) 
    //         res.json({success:true})
    //     }  else{
    //         await orderModel.findByIdAndDelete(orderId)
    //         res.json({success:false})
    //         console.log("entered false")
    //     } 
    // } catch (error) {
    //     console.log(error)
    //     res.json({success:false, message:error.message})
    // }


};








// all orders data for amins panel

const allOrders = async (req,res) =>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// all orders data for frontend 

const userOrders = async (req,res) =>{
     try {
        const { userId} = req.body 
        const orders = await orderModel.find({ userId })
        res.json({ success:true, orders})
     } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
     }
}

// update order status from admin

const updateStatus = async (req,res) =>{
     try {
          const { orderId, status} = req.body

          await orderModel.findByIdAndUpdate(orderId,{status})
          res.json({success: true, message: 'Status Updated'})
     } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
     }
}

export { placeOrder,placeOrderStack, allOrders,userOrders,updateStatus, verifyPaystack}