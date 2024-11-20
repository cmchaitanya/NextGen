import React, { useEffect, useState, useContext } from 'react';
import { FaHeart, FaCartPlus, FaArrowLeft, FaArrowRight } from "react-icons/fa"; // For icons
import { useParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import axios from "axios";
import './ProductDetails.css'; // Enhanced styles

const ProductDetails = () => {
    const { url } = useContext(StoreContext);
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);
    const { productId } = useParams();
    const [liked, setLiked] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    // Fetch product details
    useEffect(() => {
        const fetchProduct = async () => {
            const new_url = `${url}/api/product/get-product/${productId}`;
            try {
                const res = await axios.get(new_url);
                if (res.data.product) {
                    setProduct(res.data.product);
                }
            } catch (err) {
                alert('Server Error');
            }
        };
        fetchProduct();
    }, [productId, url]);

    // Fetch user who added the product
    const handleContact = async (addedBy) => {
        const new_url = `${url}/api/user/get-user/${addedBy}`;
        try {
            const res = await axios.get(new_url);
            if (res.data.user) {
                setUser(res.data.user);
                // Check if the product is in the user's likedProducts
                if (res.data.user.likedProducts && res.data.user.likedProducts.some(e => e === productId)) {
                    setLiked(true); // Product is liked
                } else {
                    setLiked(false); // Product is not liked
                }
            }
        } catch (err) {
            alert('Contact error');
        }
    };


    // Call handleContact only if product is defined
    useEffect(() => {
        if (product && product.addedBy) {
            handleContact(product.addedBy);
        }
    }, [product]);


    const handleLike = (productId, e) => {
        e.stopPropagation();
        
        let userId = localStorage.getItem('userId');
    
        if (!userId) {
            alert('Please Login first.');
            return;
        }
    
        // Toggle between like and dislike
        const new_url = liked ? url + '/api/user/dislike-product' : url + '/api/user/like-product';
        const data = { userId, productId };
    
        axios.post(new_url, data)
            .then((res) => {
                if (res.data.message) {
                    if (liked) {
                        alert('Disliked.');
                    } else {
                        alert('Liked.');
                    }
                    setLiked(!liked); // Toggle the liked state
                }
            })
            .catch((err) => {
                alert('Server Error.');
            });
    };
    

    // Handle image carousel navigation
    const handleNextImage = () => {
        if (product && product.pimage2) {
            setCurrentImage((prev) => (prev === 0 ? 1 : 0));
        }
    };

    const handlePrevImage = () => {
        if (product && product.pimage2) {
            setCurrentImage((prev) => (prev === 1 ? 0 : 1));
        }
    };

    return (
        
        <div className="product-details-container">
            {product ? (
                <>
                    <div className="product-image-slider">
                        <div className="image-container">
                            <img 
                                src={currentImage === 0 ? product.pimage1 : product.pimage2} 
                                alt={product.pname} 
                                className="product-image" 
                            />
                            {console.log(product.pimage1+" "+product.pimage2)}
                            <div className="slider-controls">
                                <FaArrowLeft className="slider-arrow left" onClick={handlePrevImage} />
                                <FaArrowRight className="slider-arrow right" onClick={handleNextImage} />
                            </div>
                        </div>
                        <div className="product-actions">
                            <FaHeart 
                                className={`like-icon ${liked ? "liked" : ""}`} 
                                onClick={(e) => handleLike(product._id, e)} 
                            />
                        </div>
                    </div>

                    {/* Product Information */}
                    <div className="product-info">
                        <h1 className="product-name">{product.pname}</h1>
                        <p className="product-description">{product.pdesc}</p>
                        <p className="product-price">Price: <span>${product.price}</span></p>
                        <span className="badge-category">{product.category}</span>

                        {user && (
                            <div className="contact-info">
                                <h2>Contact Seller</h2>
                                <p><strong>Name:</strong> {user.username}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
};

export default ProductDetails;
