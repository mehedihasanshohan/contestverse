import React from 'react'
import { Link } from 'react-router'
import github from '/github.png'
import linkedin from '/linkedin.png'
import gmail from '/gmail.png'
import fb from '/facebook.png'
import logo from '/trophy.png'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="relative bg-base-200 pt-16 pb-8 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

        {/* Left Section: Branding */}
        <div className="flex flex-col space-y-4 items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3">
            <motion.img
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
              src={logo}
              className="w-10 h-10"
              alt="Logo"
            />
            <h2 className="text-2xl font-black italic tracking-tighter text-base-content">
              CONTEST<span className="text-teal-500 underline decoration-2 underline-offset-4">VERSE</span>
            </h2>
          </div>
          <p className="text-base-content/60 text-sm max-w-xs leading-relaxed">
            The ultimate arena for creators. Showcase your talent, compete with the best, and win amazing prizes.
          </p>
        </div>

        {/* Middle Section: Quick Links */}
        <div className="flex flex-col items-center">
          <h3 className="text-base-content font-bold uppercase tracking-widest text-sm mb-6">Quick Navigation</h3>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-center">
            {['Home', 'All Contests', 'Packages', 'Resources'].map((item) => (
              <li key={item}>
                <Link
                  to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                  className="text-base-content/70 hover:text-teal-500 transition-colors font-medium hover:underline decoration-teal-500 decoration-2 underline-offset-4"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section: Connect */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-base-content font-bold uppercase tracking-widest text-sm mb-6">Connect With Us</h3>
          <div className="flex gap-4">
            {[
              { img: fb, url: 'https://facebook.com/...' },
              { img: gmail, url: 'mailto:your@email.com' },
              { img: github, url: 'https://github.com/...' },
              { img: linkedin, url: 'https://linkedin.com/...' }
            ].map((social, i) => (
              <motion.a
                key={i}
                whileHover={{ y: -5, scale: 1.1 }}
                href={social.url}
                target="_blank"
                className="p-2 bg-base-100 rounded-xl shadow-md border border-base-200 hover:border-teal-500/50 transition-all"
              >
                <img className="w-6 h-6 object-contain grayscale hover:grayscale-0 transition-all" src={social.img} alt="social" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="mt-16 pt-8 border-t border-base-content/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-base-content/50">
          <p>© {new Date().getFullYear()} <span className="text-teal-600 font-bold">ContestVerse</span>. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-base-content transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-base-content transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer