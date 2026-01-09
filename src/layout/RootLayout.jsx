import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import Footer from '../pages/shared/Footer'
import Navbar from '../pages/shared/Navbar'
import AOS from "aos";
import "aos/dist/aos.css";


const RootLayout = () => {

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
    });
  }, []);

  return (
    <div className='max-w-7xl mx-auto'>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default RootLayout