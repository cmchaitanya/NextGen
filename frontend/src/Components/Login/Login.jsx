import React, { useContext, useState } from 'react';
import './Login.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from "axios";

const Login = ({ setShowLogin, setShowSignUp }) => {
    const { url, setToken } = useContext(StoreContext);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async (event) => {
        event.preventDefault();
        const newUrl = url + "/api/user/login";
        const response = await axios.post(newUrl, formData);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('userName', response.data.username);
            console.log(response.data);
            setShowLogin(false);
        } else {
            alert(response.data.message);
        }
    };

    return (
        <div className='loginSignup'>
            <form onSubmit={login} className="loginSignup_container">
                <div className="loginSignup_title">
                    <h2>Login</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
                </div>
                <div className='loginSignup_fields'>
                    <input id='email' name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
                    <input id='password' name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
                </div>
                <button type='submit' className='loginSignup_button'>Login</button>
                <p className="loginSignup_login">
                    Don't have an account? <span onClick={() => { setShowLogin(false); setShowSignUp(true); }}>Sign Up</span>
                </p>
                <div className="loginSignUp_agree">
                    <p>By continuing, I agree to the <span>terms and conditions</span></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
