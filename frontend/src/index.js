import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';
import HomePage from './landing_page/home/HomePage';
import Signup from "./landing_page/signup/Signup.js"
import Login from "./landing_page/login/Login.js"
import  AboutPage from "./landing_page/about/AboutPage.js"
import ProductPage from "./landing_page/products/ProductPage.js"
import PricingPage from "./landing_page/pricing/PricingPage.js"
import SupportPage from "./landing_page/support/SupportPage.js"
import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import NotFound from './landing_page/NotFound.js';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./landing_page/Home";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} /> 
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/about' element={<AboutPage/>}/>
    <Route path='/product' element={<ProductPage/>}/>
    <Route path='/pricing' element={<PricingPage/>}/>
    <Route path='/support' element={<SupportPage/>}/>
    <Route path='*' element={<NotFound/>}/>
  </Routes>
  <Footer/>
  </BrowserRouter>
);

