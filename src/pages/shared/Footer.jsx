import React from 'react'
import { Link } from 'react-router'
import github from '/github.png'
import linkedin from '/linkedin.png'
import gmail from '/gmail.png'
import fb from '/facebook.png'

const Footer = () => {
  return (
      <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
        <ul className="text-xl text-teal-600 flex justify-center items-center gap-6 font-semibold px-1">
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/all-contests'>All Contests</Link></li>
          <li><Link to='/packages'>Packages</Link></li>
          <li><Link to='/resources'>Resourcess</Link></li>
        </ul>
  <nav>
    <div className="grid grid-flow-col gap-4">
      <a href='https://www.facebook.com/profile.php?id=100007820023284' target='_blank'><img className='w-8 h-8' src={fb} alt="" /></a>
      <a href='' target='_blank'><img className='w-8 h-8' src={gmail} alt="" /></a>
      <a href='https://github.com/mehedihasanshohan' target='_blank'><img className='w-8 h-8' src={github} alt="" /></a>
      <a href='https://www.linkedin.com/in/mehedihasanshohan/' target='_blank'><img className='w-8 h-8' src={linkedin} alt="" /></a>
    </div>
  </nav>
  <aside>
    <p className='font-semibold'>Copyright © {new Date().getFullYear()} - All right reserved by <span className='text-primary font-bold text-lg'>Contest Verse</span></p>
  </aside>
</footer>
  )
}

export default Footer