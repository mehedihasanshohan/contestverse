import React from 'react'

const Subtitle = ({ children, className = "" }) => {
  return (
    <div
      data-aos="fade-down"
      className={`font-body text-base-content font-medium opacity-70
                 text-sm md:text-base lg:text-lg text-center
                 max-w-2xl mx-auto mb-10 leading-relaxed ${className}`}
    >
      {children}
    </div>
  )
}

export default Subtitle;