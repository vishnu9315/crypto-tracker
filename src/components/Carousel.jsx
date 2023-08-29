import React, { useEffect, useState } from 'react';
import { TrendingCoins } from '../config/api';
import axios from 'axios';
import { CryptoState } from '../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';


export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const Carousel = () => {
  const {currency, symbol} = CryptoState();
  const [trending, setTrending] = useState([])
  console.log(trending)


  const fetchTrendingCoins = async() => {
    const {data} = await axios.get(TrendingCoins(currency));
    setTrending(data)
  }

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency])

  const responsive = {
    0:{
      items:2
    },
    512: {
      items:5
    }
  }

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    return (
      <Link to = "/" className='flex flex-col items-center cursor-pointer'>
       <img src = {coin?.image}
       alt = {coin.name}
       className='h-20 mx-auto'
       /> 
       <span className='text-white m-4 uppercase'>
        {coin?.symbol}
        &nbsp;
        <span className= {`${profit > 0 ? 'text-green-500' : 'text-red-500'}`}>
        {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
        </span>
       </span>
       <span className="text-2xl font-semibold text-white">
        {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
       </span>
       </Link>
    )
  })

  return (
    <div className="crousel"> 
      <AliceCarousel 
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
       
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
