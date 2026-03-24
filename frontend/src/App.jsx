import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return(
  <div className='px-3 sm:px-[4vw] md:px-[6vw] lg:px-[8vw] max-w-[1700px] mx-auto'>
    <ToastContainer />
    <Navbar />
    <SearchBar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/collection' element={<Collection />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/product/:productId' element={<Product />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/place-order' element={<PlaceOrder />} />
      <Route path='/orders' element={<Orders />} />
    </Routes>
    <Footer />
  </div>
  )
}

export default App
