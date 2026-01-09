import React from 'react'

const Title = ({ children, className = "" }) => {
  return (
    <div
      data-aos="fade-down"
      className={`font-title text-base-content font-bold
         text-2xl opacity-80 mb-6 md:text-3xl lg:text-4xl text-center ${className}`}
    >
      {children}
    </div>
  )
}

export default Title