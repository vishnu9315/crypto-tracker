import './App.css';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import CoinPage from './pages/CoinPage';
import { Routes, Route } from 'react-router-dom';
import {CoinInfo} from './components/CoinInfo';

function App() {
  return (
    <div className= 'bg-dark'>
      <Header />
      <Routes>
        <Route path = "/" exact element = {<Homepage />} />
        <Route path = "coins/:id" exact element = {<CoinInfo />} />
      </Routes>
    </div>
  );
}

export default App;
