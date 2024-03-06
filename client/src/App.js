import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Category from './components/Category';
import Payment from './components/Payment';

function App () {
  return (
    <div>
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/occasion/:occasion" element={<Category />} />
          <Route path="/payment" element={<Payment />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
