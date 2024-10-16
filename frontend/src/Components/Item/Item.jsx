import React, { useEffect, useState } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const Item = (props) => {
    const [liked, setLiked] = useState(false); // state for like toggle
    const url = 'http://localhost:4000';
    const item = props.product;
    const handleContact = async (userId) => {
      const new_url = `${url}/api/user/get-user/${userId}`;
      try {
          const res = await axios.get(new_url);
          if (res.data.user) {
              // Check if the product is in the user's likedProducts
              if (res.data.user.likedProducts && res.data.user.likedProducts.some(e => e === item._id)) {
                  setLiked(true); // Product is liked
              } else {
                  setLiked(false); // Product is not liked
              }
          }
      } catch (err) {
          alert(err);
      }
  };

  useEffect(()=>{
    let userId = localStorage.getItem('userId');
      if(userId){
        handleContact(userId);
      }
  },[])

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


    return (
        <div className='product'>
            <Link to={`/product/${item._id}`}> 
                <img onClick={window.scrollTo(0,0)} src={`${url}/${item.pimage1}`} alt={item.pname} />
            </Link>
            <div className="item-img"></div>
            <div className="item-info">
                <h3 className="item-name">{item.pname}</h3>
                <p className="item-category">Category: {item.category}</p>
                <p className="item-price">Price: Rs. {item.price}</p>
                <p className="item-description">{item.pdesc}</p>
            </div>
            <div className="item-actions">
                <FaHeart 
                    className={`heart-icon ${liked ? 'liked' : ''}`} 
                    onClick={(e) => handleLike(item._id, e)} 
                    style={{ color: liked ? 'red' : 'grey', cursor: 'pointer' }} 
                />
            </div>
        </div>
    );
}

export default Item;
