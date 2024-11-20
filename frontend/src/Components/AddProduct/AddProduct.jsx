import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';
import axios from "axios";
import { StoreContext } from '../../Context/StoreContext';

const AddProduct = () => {
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();
  const [pname, setpname] = useState('');
  const [pdesc, setpdesc] = useState('');
  const [price, setprice] = useState('');
  const [category, setcategory] = useState('');
  const [pimage1, setpimage1] = useState('');
  const [pimage2, setpimage2] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  const handleApi = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const formData = new FormData();
      formData.append('plat', position.coords.latitude);
      formData.append('plong', position.coords.longitude);
      formData.append('pname', pname);
      formData.append('pdesc', pdesc);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('pimage1', pimage1);
      formData.append('pimage2', pimage2);
      formData.append('userId', localStorage.getItem('userId'));
      
      const new_url = url + '/api/product/add-product';
      axios.post(new_url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
          navigate('/');
        }
      })
      .catch((err) => {
        alert('Error adding product');
      });
    },
    (error) => {
      console.log("Geolocation error:", error);
      alert('Please enable location permissions');
    });
  };

  return (
    <div className='add_product'>
      <h1>Add Product</h1>
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
            <img src={pimage1 ? URL.createObjectURL(pimage1) : upload_area} className='addproduct_thumbnail_img' alt="Upload" />
            <input 
              type="file"
              accept="image/*"
              onChange={(e) => setpimage1(e.target.files[0])}
            />
          </label>
          <label className="image-label">
            <img src={pimage2 ? URL.createObjectURL(pimage2) : upload_area} className='addproduct_thumbnail_img' alt="Upload" />
            <input 
              type="file"
              accept="image/*"
              onChange={(e) => setpimage2(e.target.files[0])}
            />
          </label>
        </div>
      </div>
      <button onClick={handleApi} className='addproduct_button'>Add Product</button>
    </div>
  );
};

export default AddProduct;
