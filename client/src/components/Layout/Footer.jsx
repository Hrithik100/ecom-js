import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer bg-gray-900 py-4 w-full'>
        <h4 className='text-center text-white text-xl mb-3'>
            All Right Reserved &copy; Hrithik
        </h4>
        {/* <p className="text-center mt-3 text-white">
          <Link to="/about">About</Link>
          |
          <Link to="/contact">Contact</Link>
          |
          <Link to="/policy">Privacy Policy</Link>
        </p> */}
    </div>
  )
}

export default Footer