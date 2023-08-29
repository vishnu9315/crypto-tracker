import React, { useEffect, useState } from 'react'
import {createContext, useContext} from 'react'



const Crypto = createContext();


const CryptoContext = ({children}) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹")
  const [value, setValue] = useState("")

  useEffect(() => {
    if(currency === "INR"){
      setSymbol("₹")
    }
    if(currency === "USD"){
      setSymbol("$")
    }
  }, [currency])
  return (
    <Crypto.Provider value = {{currency, symbol, setCurrency, value, setValue}}>
        {children}
    </Crypto.Provider>
  )
}

export default CryptoContext

export const CryptoState = () => {
    return useContext(Crypto);
}