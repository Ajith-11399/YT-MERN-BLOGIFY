import React from 'react';

const Footer = () => {
  return (
    <div className='text-md text-center bg-gray-50 py-10'>
      &copy; Copyright {new Date().getFullYear()} | Designed and Developed with ❤️ by : <a href="https://ajith11399.vercel.app" className='font-medium' target='_blank'>AJI 🤝 Aki</a>
    </div>
  );
};

export default Footer;