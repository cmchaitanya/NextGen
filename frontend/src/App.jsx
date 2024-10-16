import React, { useState } from 'react'
import {Route,Routes } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Pages/Home/Home'
import Login from './Components/Login/Login'
import AddProduct from './Components/AddProduct/AddProduct'
import LikedProduct from './Components/LikedProduct/LikedProduct'
import CategoryPage from './Components/CategoryPage/CategoryPage'
import MyProfile from './Components/MyProfile/MyProfile'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import SignUp from './Pages/SignUp/SignUp'

const App = () => {
  const [showLogin,setShowLogin]=useState(false);
  const [showSignUp,setShowSignUp]=useState(false);
  return (
    <>
      {showLogin?<Login setShowLogin={setShowLogin} setShowSignUp={setShowSignUp} />:<></>}
      {showSignUp?<SignUp setShowSignUp={setShowSignUp} setShowLogin={setShowLogin}/> :<></>}
      <div className='app'>
      <Header setShowLogin={setShowLogin} setShowSignUp={setShowSignUp} />
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/add-product' element={ <AddProduct/> }/>
          <Route path='/login' element={<Login setShowLogin={setShowLogin} /> }/>
          <Route path='/category/:catName' element={<CategoryPage/> }/>
          <Route path='/liked-products' element={<LikedProduct/> }/>
          <Route path='/my-profile' element={<MyProfile/> }/>
          <Route path='/product/:productId' element={<ProductDetails/> }/>
          {/* <Route path='/list' element={ <ProductDisplay/> }/> */}
          {/* <Route path='/product' element={<Product/> }>
            <Route path=':productId' element={<Product/>}/>
          </Route> */}
      </Routes>
    </div>
    </>
  )
}

export default App
