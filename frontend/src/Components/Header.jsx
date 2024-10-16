import React, { useContext, useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';
import { assets } from '../assets/assets';
import { FaSearch, FaUserCircle, FaHeart, FaPlusCircle, FaSignOutAlt, FaUserAlt } from "react-icons/fa";

const Header = ({ setShowLogin, setShowSignUp }) => {
  const { token, setToken, userId, setUserId } = useContext(StoreContext);
  const { search, setSearch, handleClick } = useContext(StoreContext);
  const { locations } = useContext(StoreContext);
  const [loc, setLoc] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken("");
    setUserId("");
    navigate("/");
  };

  return (
    <header className='header'>
      <div className="header-container">
        <Link to={'/'} className="logo">NextGen</Link>

        <select 
          className="location-select" 
          value={loc} 
          onChange={(e) => {
            localStorage.setItem('userLoc', e.target.value);
            setLoc(e.target.value);
          }}
        >
          <option value="" disabled>Select Location</option>
          {locations.map((item, index) => (
            <option key={index} value={`${item.latitude},${item.longitude}`}>
              {item.placeName}
            </option>
          ))}
        </select>

        <div className="search-container">
          <input
            className='search-input'
            type='text'
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch && setSearch(e.target.value)}
          />
          <button className='search-btn' onClick={() => {handleClick && handleClick()}}>
            <FaSearch />
          </button>
        </div>

        <div className="navbar_right">
          {!token ? (
            <>
              <button className="auth-btn" onClick={() => setShowLogin(true)}>Sign In</button>
              <button className="auth-btn signup-btn" onClick={() => setShowSignUp(true)}>Sign Up</button>
            </>
          ) : (
            <div className="header_profile">
              <FaUserCircle className="profile_icon" />
              <ul className="header_profile_dropdown">
                <li onClick={() => navigate('/liked-products')}>
                  <FaHeart /> <p>WishList</p>
                </li>
                <li onClick={() => navigate('/add-product')}>
                  <FaPlusCircle /> <p>Add Product</p>
                </li>
                <li onClick={() => navigate('/my-profile')}>
                  <FaUserAlt /> <p>My Profile</p>
                </li>
                <li onClick={logout}>
                  <FaSignOutAlt /> <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
