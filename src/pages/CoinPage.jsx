import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { Link } from 'react-router-dom';
import { numberWithCommas } from '../components/Carousel';


const CoinPage = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false);
  const { currency, symbol } = CryptoState();

  // Fetch coins
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-">
      {loading ? (<div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>) : (<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className='bg-golden'>
            <th scope="col" className="px-6 ml-12 py-3 w-800" style={{ width: '800px' }}>
              <span className="sr-only">Image</span>
              Coin
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              24h Change
            </th>
            <th scope="col" className="px-6 py-3">
              Market Cap
            </th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => {
            const profit = coin?.price_change_percentage_24h >= 0;

            return (
              <tr key={coin.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                <td className="w-24 p-4">
                  <Link to={`/coins/${coin.id}`} className='flex h-12'>
                    <img src={coin.image} alt={coin.name} />
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {coin.name}
                    </td>
                  </Link>
                </td>

                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </td>
                <td className={`px-6 py-4 font-semibold ${profit ? 'text-green-500' : 'text-red-500'} text-gray-900 dark:text-white`}>
                  {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                </td>

                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {numberWithCommas(coin?.market_cap.toString().slice(0, -6))}M
                </td>

              </tr>
            );
          })}

        </tbody>
      </table>)}
    </div>
  )
}

export default CoinPage;
