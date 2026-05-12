import React, { useState, useEffect, useReducer } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import UserContext from './contexts/UserContext'
import CartContext from './contexts/CartContext'
// import { jwtDecode } from 'jwt-decode'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import './App.css'
import Routing from './components/routing/Routing'
import { getJwt, getUser } from './services/userServices'
import setAuthToken from './utils/setAuthToken'
import { addToCartAPI, decreaseProductAPI, getCartAPI, increaseProductAPI, removeFromCartAPI } from './services/cartServices'
import 'react-toastify/dist/ReactToastify.css';
import cartReducer from './reducers/cartReducer'
// import HomePage from './components/home/HomePage'
// import ProductsPage from './components/products/ProductsPage'
// import SingleProductPage from './components/singleProduct/SingleProductPage'
// import CartPage from './components/cart/CartPage'
// import MyOrderPage from './components/myorder/MyOrderPage'
// import LoginPage from './components/authentication/LoginPage'
// import SignupPage from './components/authentication/SignupPage'

setAuthToken(getJwt())

const App = () => {
  const [userData, setUserData] = useState(null)
  // const [cart, setCart] = useState([]);
  const [cart, dispatchCart] = useReducer(cartReducer, [])

  useEffect(() => {
    try {
      // const jwt = localStorage.getItem("token")
      // const jwtUser = jwtDecode(jwt)
      const jwtUser = getUser();
      console.log(jwtUser)
      if (Date.now >= jwtUser.exp * 1000) {
        localStorage.removeItem('token')
        location.reload()
      } else {
        setUserData(jwtUser)
      }
    } catch (error) {
      console.log('error...', error)
    }
  }, [])

  const addToCart = (product, quantity) => {

    dispatchCart({ type: "ADD_TO_CART", payload: { product, quantity } })

    addToCartAPI(product._id, quantity).then((res) => {
      toast.success("Product Added Successfully!")
    }).catch((err) => {
      toast.error("Failed to add product!")
      dispatchCart({ type: "REVERT_CART", payload: { cart } })
    })
  }
  // console.log('cart...', cart);
  const removeFromCart = (id) => {
    dispatchCart({ type: "REMOVE_FROM_CART", payload: { id } })

    removeFromCartAPI(id).catch((err) => {
      toast.error("Something went wrong!");
      dispatchCart({ type: "REVERT_CART", payload: { cart } })
    })
  }

  const updateCart = (type, id) => {
    const updatedCart = [...cart]
    const productIndex = updatedCart.findIndex((item) => item.product._id === id)

    if (type === 'increase') {
      updatedCart[productIndex].quantity += 1
      dispatchCart({ type: "GET_CART", payload: { products: updatedCart } })
      increaseProductAPI(id).catch((error) => {
        toast.error("Something went wrong!");
        dispatchCart({ type: "REVERT_CART", payload: { cart } })
      })
    }
    if (type === 'decrease') {
      updatedCart[productIndex].quantity -= 1;
      dispatchCart({ type: "GET_CART", payload: { products: updatedCart } })

      decreaseProductAPI(id).catch((error) => {
        toast.error("Something went wrong!");
        dispatchCart({ type: "REVERT_CART", payload: { cart } })
      })
    }
  }

  const getCart = () => {
    getCartAPI().then((res) => {
      dispatchCart({ type: "GET_CART", payload: { products: res.data } })
    }).catch((err) => {
      toast.error("Something went wrong!")
    })
  }

  useEffect(() => {
    if (userData) {
      getCart()
    }
  }, [userData])


  return (
    <UserContext.Provider value={userData}>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCart }}>
        <div className='app'>
          <Navbar />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
            {/* <Routing addToCart={addToCart} cart={cart} /> */}
            {/* <HomePage /> */}
            {/* <ProductsPage /> */}
            {/* <SingleProductPage /> */}
            {/* <CartPage /> */}
            {/* <MyOrderPage /> */}
            {/* <LoginPage /> */}
            {/* <SignupPage /> */}
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  )
}

export default App