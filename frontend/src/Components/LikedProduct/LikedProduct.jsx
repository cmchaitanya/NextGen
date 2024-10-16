import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import './LikedProduct.css';
import { FaHeart } from "react-icons/fa";
import Item from '../Item/Item';

const LikedProduct = () => {
    const { url } = useContext(StoreContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchLikedProducts = async () => {
            const new_url = `${url}/api/user/liked-products`;
            const data = { userId: localStorage.getItem('userId') };
            try {
                const res = await axios.post(new_url, data);
                if (res.data.products) {
                    setProducts(res.data.products);
                }
            } catch (err) {
                alert('Server Error');
            }
        };
        fetchLikedProducts();
    }, [url]);

    return (
        <div className="liked-product-container">
            <h2>Liked Products</h2>
            <div className="profile-product-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="liked-card">
                            <Item product={product}/>
                        </div>
                    ))
                ) : (
                    <p>No liked products found.</p>
                )}
            </div>
        </div>
    );
};

export default LikedProduct;
