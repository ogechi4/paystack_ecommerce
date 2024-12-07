import { v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'

// //function for add product
// const addProduct = async (req, res) =>{
//         try {
//             const {name, description, price, category, subCategory, sizes,bestseller} = req.body
        
//                // to get the images
//             const image1 = req.files.image1 && req.files.image1[0]
//             const image2 = req.files.image2 && req.files.image2[0]
//             const image3 = req.files.image3 && req.files.image3[0]
//             const image4 = req.files.image4 && req.files.image4[0]

//             // store the image in the cloudinary
//             const images = [image1,image2,image3,image4].filter((item)=>item !== undefined)
//             //   now store the images in the url
//             let imagesUrl = await Promise.all(
//                 images.map(async (item) =>{
//                     let result = await cloudinary.uploader.upload(item.path, {resource_type:'image'})
//                     return result.secure_url
//                 })
//             )
         

//             // now lets save to mongodb
//             const productData = {
//                 name,
//                 description,
//                 category,
//                 price: Number(price),
//                 subCategory,
//                 bestseller: bestseller == "true" ? true : false,
//                 sizes:JSON.parse(sizes),
//                 image:imagesUrl,
//                 date:Date.now()
//             }
//             console.log(productData)

//             const product = new productModel(productData)
//             await product.save()
//             res.json({ success: true, message:"Product Added"})
//         } catch (error) {
//             console.log(error)
//             res.json({success:false, message:error.message})
            
//         }
     
//   }


const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Retrieve uploaded images
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        // Store images in Cloudinary
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        // Parse and validate sizes
        let parsedSizes = [];
        if (subCategory === 'Shoes') {
            // For shoes, sizes are custom and provided as an array of numbers or strings
            parsedSizes = JSON.parse(sizes).map((size) => size.toString());
        } else {
            // For other categories, use predefined sizes (S, M, L, XL, XXL)
            const predefinedSizes = ['S', 'M', 'L', 'XL', 'XXL'];
            parsedSizes = JSON.parse(sizes).filter((size) => predefinedSizes.includes(size));
        }

        // Prepare product data for saving to the database
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === 'true',
            sizes: parsedSizes,
            image: imagesUrl,
            date: Date.now(),
        };

        console.log(productData);

        // Save product to MongoDB
        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: 'Product Added' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// function for list product

const listProduct = async (req,res) =>{
    try {
         const products = await productModel.find({})
         res.json({success: true, products})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// function for removing product
const removeProduct = async (req,res) =>{
    try {
         await productModel.findByIdAndDelete(req.body.id)
          res.json({success:true,message:"Product Removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
//   functionn for single product info
const singleProduct = async (req,res) =>{
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {listProduct, addProduct,removeProduct,singleProduct}