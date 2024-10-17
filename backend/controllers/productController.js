import productModel from "../models/productModel.js";
import fs from 'fs'
import validator from "validator";

//add product item
const addProduct=(req,res)=>{
    const plat = req.body.plat;
    const plong = req.body.plong;
    const pname = req.body.pname;
    const pdesc = req.body.pdesc;
    const price = req.body.price;
    const category = req.body.category;
    
    console.log(req.body);

    if (!plat || !plong || !pname || !pdesc || !price || !category) {
        return res.status(400).send({ message: 'All fields are required' });
    }
    console.log("hello");
    if (!req.files || !req.files.pimage1 || !req.files.pimage2) {
        return res.status(400).send({ message: 'Both images are required' });
    }
    
    

    const pimage1 = req.files.pimage1[0].path;
    const pimage2 = req.files.pimage2[0].path;

    const addedBy = req.body.userId;
    const product=new productModel({
        pname : pname,
        pdesc : pdesc,
        price : price,
        category : category,
        pimage1 : pimage1,
        pimage2 : pimage2,
        addedBy : addedBy,
        pLoc: {
            type: 'Point', coordinates: [plat, plong]
        }
    })
    console.log(product);

    product.save()
        .then(() => {
            res.send({ message: 'saved success.' })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })
}


const getProducts = (req, res) => {
    const catName = req.query.catName;
    let _f = {}
    if (catName) {
        _f = { category: catName }
    }

    productModel.find(_f)
        .then((result) => {
            res.send({ message: 'success', products: result })

        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })

}
const search = (req, res) => {
    let search = req.query.search;
    let searchCriteria = [];

    // Extract latitude and longitude from query
    let latitude = parseFloat(req.query.loc.split(',')[0]);
    let longitude = parseFloat(req.query.loc.split(',')[1]);

    // Search by pname and pdesc using regex, case-insensitive
    if (search) {
        searchCriteria.push({ pname: { $regex: search, $options: 'i' } });
        searchCriteria.push({ pdesc: { $regex: search, $options: 'i' } });
    }

    // Check if the search term is a valid number for the price field
    if (!isNaN(search)) {
        searchCriteria.push({ price: Number(search) });
    }

    // Add geospatial search criteria (products near the provided location)
    const locationCriteria = {
        pLoc: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [latitude, longitude]
                },
                $maxDistance: 500 * 1000  // 500 kilometers in meters
            }
        }
    };

    // If there are search criteria, combine them with the geospatial query
    if (searchCriteria.length > 0) {
        productModel.find({
            $and: [
                { $or: searchCriteria },  // Text and price search
                locationCriteria  // Geospatial search
            ]
        })
        .then((results) => {
            res.send({ message: 'success', products: results });
        })
        .catch((err) => {
            console.error(err);
            res.status(404).send({ message: 'Not found' });
        });
    } else {
        res.status(400).send({ message: 'Invalid search input' });
    }
};


const getProductsById = (req, res) => {
    productModel.findOne({ _id: req.params.pId })
        .then((result) => {
            res.send({ message: 'success', product: result })
        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })

}

const myProducts = (req, res) => {
    const userId = req.body.userId;

    productModel.find({ addedBy: userId })
        .then((result) => {
            res.send({ message: 'success', products: result })
        })
        .catch((err) => {
            console.log(err)
            res.send({ message: 'server err' })
        })

}

//remove product item
const removeProduct=async(req,res)=>{
    try {
        const product=await productModel.findById(req.body.productId);
        await productModel.findByIdAndDelete(req.body.productId); //delete from database
        res.json({success:true,message:"Product Removed"})
    } catch (error) {
        console.log("ERROR")
        res.json({success:false,message:"ERROR"});
    }
}

export {addProduct,getProducts,getProductsById,myProducts,removeProduct,search}