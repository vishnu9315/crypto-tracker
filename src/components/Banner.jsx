import React from 'react'
import banner from "../assets/banner2.jpg"
import Carousel from '../components/Carousel'; 

const Banner = () => {
  return (
    <div
    className="h-400 bg-cover bg-center relative"
    style={{  backgroundImage: `url(${banner})` }}
  >
    <div className="h-400 bg-opacity-50 bg-black flex flex-col justify-between p-5">
      <div className="h-40 flex flex-col justify-center text-center">
        <h2 className="text-4xl font-bold mb-3 font-montserrat text-white">
          Crypto Hunter
        </h2>
        <p className="text-sm text-darkgrey capitalize font-montserrat text-white">
          Get all the Info regarding your favorite Crypto Currency
        </p>
      </div>
     
    </div>
    <Carousel />
  </div>
  )
}

export default Banner