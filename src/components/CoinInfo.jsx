import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SingleCoin } from '../config/api';
import { useParams } from 'react-router-dom';
import { numberWithCommas } from './Carousel';
import HTMLReactParser from "html-react-parser";
import { CryptoState } from '../CryptoContext';


export const CoinInfo = () => {
    const [coin, setcoin] = useState([])
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    const {symbol} = CryptoState();
    

    const fetchDetails = async () => {
        setLoading(true);
        const { data } = await axios.get(SingleCoin(id));
        setcoin(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchDetails();
    }, [])

    
  return (
    <main >
      <section className="flex justify-around flex-wrap py-12">
        <div className="max-w-sm py-24">
        {coin.image && coin.image.large && (
        <img className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md " src={coin.image.large} alt={coin.name} />
      )}
        </div>
        <div className="max-w-2xl text-gray-700 text-lg dark:text-white py-10">
          <h1 className="text-4xl font-bold my-3 text-center lg:text-left">{coin.name}</h1>
          
          {coin.description && coin.description.en && (<p className="my-4">{HTMLReactParser(coin?.description.en.split(". ")[0])}.</p>)}
                      
          <p className="my-4">
            <span className="mr-2 font-bold">Rank:</span>
            <span>{coin.market_cap_rank}</span>
          </p>

          <p className="my-4">
            <span className="mr-2 font-bold">Current Price:</span>
            {symbol} {coin.market_data && coin.market_data.current_price && <span>{numberWithCommas(coin.market_data.current_price.inr.toFixed(2))}</span>}
          </p>

          <p className="my-4">
            <span className="mr-2 font-bold">Market Cap:</span>
            {coin.market_data && coin.market_data.market_cap && <span>{numberWithCommas(coin.market_data.market_cap.inr.toString().slice(0, -6))}M</span>}
          </p>


        </div>
      </section>
    </main>
  )
}