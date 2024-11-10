import jwt from 'jsonwebtoken'

const authUser =async (req,res,next) =>{
    // create token
    const {token} = req.headers

    if(!token){
        return res.json({ success: false, message: 'Not Authorized Login Again'})
    }

    try {
        // to decode the token
         const token_decode = jwt.verify( token, process.env.JWT_SECRET)
        //  add the user id property that we would get from the token
         req.body.userId = token_decode.id
        // req.user = { id: token_decode.id };
         next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message})
    }
}

export default authUser