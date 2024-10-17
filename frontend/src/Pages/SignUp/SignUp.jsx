import React, { useContext, useState } from 'react';
import './SignUp.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SignUp = ({ setShowSignUp, setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        roll: "",
        branch: "",
        hostel: "",
        contact: "",
        password: ""
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const signup = async (event) => {
        event.preventDefault();
        const newUrl = url + "/api/user/signup";
        const response = await axios.post(newUrl, formData);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            setShowSignUp(false);
        } else {
            alert(response.data.message);
        }
    };

    return (
        <div className='loginSignup'>
            <form onSubmit={signup} className="loginSignup_container">
                <div className="loginSignup_title">
                    <h2>Sign Up</h2>
                    <img onClick={() => setShowSignUp(false)} src={assets.cross_icon} alt="close" />
                </div>
                <div className='loginSignup_fields'>
                    <input id='username' name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Enter Username' />
                    <input id='email' name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Enter Email' />
                    <input id='contact' name='contact' value={formData.contact} onChange={changeHandler} type="number" placeholder='Enter Contact No.' />
                    <select id='branch' name='branch' value={formData.branch} onChange={changeHandler}>
                        <option>Your Branch</option>
                        <option>CSE</option>
                        <option>Electronics</option>
                        <option>Mechanical</option>
                        <option>Chemical</option>
                        <option>Civil</option>
                    </select>
                    <input id='roll' name='roll' value={formData.roll} onChange={changeHandler} type="number" placeholder='Enter Roll no.' />
                    <select id='hostel' name='hostel' value={formData.hostel} onChange={changeHandler}>
                        <option>Your Hostel</option>
                        <option>Vishweshwaraiya</option>
                        <option>DhanrajGiri</option>
                        <option>Morvi</option>
                    </select>
                    <input id='password' name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
                </div>
                <button type='submit' className='loginSignup_button'>Create Account</button>
                <p className="loginSignup_login">
                    Already have an account? <span onClick={() => { setShowSignUp(false); setShowLogin(true) }}>Login</span>
                </p>
                <div className="loginSignUp_agree">
                    <p>By continuing, I agree to the <span>terms and conditions</span></p>
                </div>
            </form>

        </div>
    );
};

export default SignUp;
