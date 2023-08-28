import './App.css';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import CoinPage from './pages/CoinPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className= 'App'>
      <Header />
      <Routes>
        <Route path = "/" exact element = {<Homepage />} />
        <Route path = "/coins/:id" exact element = {<CoinPage />} />
      </Routes>
    </div>
  );
}

export default App;
