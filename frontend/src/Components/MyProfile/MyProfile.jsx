import React, { useEffect, useState, useContext } from 'react';
import { FaUserCircle, FaEnvelope, FaPhone, FaUniversity, FaHome, FaHeart } from 'react-icons/fa';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import './MyProfile.css';
import Item from '../Item/Item';

const MyProfile = () => {
    const { url } = useContext(StoreContext);
    const [user, setUser] = useState({});
    const [products, setProducts] = useState([]);

    const deleteItem = async (productId) => {
        const new_url = `${url}/api/product/del`;
        const data = { userId: localStorage.getItem('userId'), productId:productId};
        try {
            const res = await axios.post(new_url,data);
            alert(res.data.message);
        } catch (err) {
            alert(err);
        }
    };

    useEffect(() => {
        // Fetch user profile data
        const new_url = url + '/api/user/my-profile/' + localStorage.getItem('userId');
        axios.get(new_url)
            .then((res) => {
                if (res.data.user) {
                    setUser(res.data.user);
                }
            })
            .catch((err) => {
                alert('User not fetched');
            });

        // Fetch user's products
        const product_url = url + '/api/product/my-products';
        const data = { userId: localStorage.getItem('userId') };
        axios.post(product_url, data)
            .then((res) => {
                if (res.data.products) {
                    setProducts(res.data.products);
                }
            })
            .catch((err) => {
                alert("My products not fetched");
            });
    }, []);

    return (
        <div className="profile-container">
            {/* User Profile Section */}
            <div className="profile-card">
                <div className="profile-header">
                    <FaUserCircle className="profile-icon" />
                    <h2>{user.username}</h2>
                    <p>Roll No: {user.roll}</p>
                </div>
                <div className="profile-details">
                    <div className="profile-item">
                        <FaEnvelope className="profile-item-icon" />
                        <span>{user.email}</span>
                    </div>
                    <div className="profile-item">
                        <FaPhone className="profile-item-icon" />
                        <span>{user.contact}</span>
                    </div>
                    <div className="profile-item">
                        <FaUniversity className="profile-item-icon" />
                        <span>Branch: {user.branch}</span>
                    </div>
                    <div className="profile-item">
                        <FaHome className="profile-item-icon" />
                        <span>Hostel: {user.hostel}</span>
                    </div>
                </div>
            </div>

            {/* User's Products Section */}
            <div className="products-section">
                <h3>My Products</h3>
                <div className="products-grid">
                    {products.map((product) => (
                        <div key={product._id} className="profile-product-card">
                            <Item product={product}/>
                            <button onClick={(e) => deleteItem(product._id,e)}>Delete</button>
                            <button>update</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
