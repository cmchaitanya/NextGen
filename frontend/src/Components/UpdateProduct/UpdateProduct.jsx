import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import axios from "axios";
import '../AddProduct/AddProduct.css';


const UpdateProduct = () => {
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();
    const { productId } = useParams();

    const [pname, setpname] = useState('');
    const [pdesc, setpdesc] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState('');
    const [pimage1, setpimage1] = useState(null);
    const [pimage2, setpimage2] = useState(null);

    // Fetch product details
    useEffect(() => {
        const fetchProduct = async () => {
            const new_url = `${url}/api/product/get-product/${productId}`;
            try {
                const res = await axios.get(new_url);
                if (res.data.product) {
                    const product = res.data.product;
                    setpname(product.pname);
                    setpdesc(product.pdesc);
                    setprice(product.price);
                    setcategory(product.category);
                    setpimage1(product.pimage1);
                    setpimage2(product.pimage2);
                }
            } catch (err) {
                alert('Server Error');
            }
        };
        fetchProduct();
    }, [productId, url]);



     useEffect(() => {
        if (!localStorage.getItem('token')) {
          navigate('/login');
        }
      }, [navigate]);
    

      const handleApi = async () => {
          const formData = new FormData();
          formData.append('pname', pname);
          formData.append('pdesc', pdesc);
          formData.append('price', price);
          formData.append('category', category);
          
          if (pimage1 instanceof File) formData.append('pimage1', pimage1);
         if (pimage2 instanceof File) formData.append('pimage2', pimage2);
    
         const updateUrl = `${url}/api/product/update/${productId}`;
         try {
           const res = await axios.post(updateUrl, formData, {
             headers: { 'Content-Type': 'multipart/form-data' },
           });
           if (res.data.message) {
             alert(res.data.message);
            //  navigate('/');
           }
         } catch (err) {
           alert(err);
         }
    }

  return (
    <div className='add_product'>
    <h1>Update Product</h1>
    <div className="addproduct_itemfield">
      <label>Product Name</label>
      <input
        value={pname}
        onChange={(e) => setpname(e.target.value)}
        type="text"
        placeholder='Type here'
      />
    </div>
    <div className="addproduct_itemfield">
      <label>Product Description</label>
      <input
        value={pdesc}
        onChange={(e) => setpdesc(e.target.value)}
        type="text"
        placeholder='Type here'
      />
    </div>
    <div className="addproduct_itemfield">
      <label>Product Price</label>
      <input
        value={price}
        onChange={(e) => setprice(e.target.value)}
        type="number"
        placeholder='Type here'
      />
    </div>
    <div className="addproduct_itemfield">
      <label>Product Category</label>
      <select
        value={category}
        onChange={(e) => setcategory(e.target.value)}
        className='add_product_selector'
      >
        <option value="">Select a Category</option>
        <option value="Bikes">Bikes</option>
        <option value="Scooty">Scooty</option>
        <option value="Cycle">Cycle</option>
        <option value="Cooler">Cooler</option>
        <option value="Electronics">Electronics</option>
        <option value="Other">Other</option>
      </select>
    </div>
    <div className="addproduct_itemfield">
      <label>Product Images</label>
      <div className="image-upload">
        <label className="image-label">
          <img
            src={pimage1 instanceof File ? URL.createObjectURL(pimage1) : pimage1}
            className='addproduct_thumbnail_img'
            alt="Product"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setpimage1(e.target.files[0])}
          />
        </label>
        <label className="image-label">
          <img
            src={pimage2 instanceof File ? URL.createObjectURL(pimage2) : pimage2}
            className='addproduct_thumbnail_img'
            alt="Product"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setpimage2(e.target.files[0])}
          />
        </label>
      </div>
    </div>
    <button onClick={handleApi} className='addproduct_button'>Update Product</button>
    </div>
    );
}

export default UpdateProduct
