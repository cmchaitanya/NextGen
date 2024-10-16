import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    pname: { type: String, required: true },
    pdesc: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    pimage1: { type: String },
    pimage2: { type: String },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Consider referencing User if needed
    pLoc: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number] 
        }
    }
});

productSchema.index({ pLoc: '2dsphere' });

const productModel = mongoose.models.Product || mongoose.model("Product", productSchema);
export default productModel;
