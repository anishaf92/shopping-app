import React, {useEffect, useState} from 'react';
import ProductCard from './ProductCard';
import {useNavigate} from 'react-router-dom';

const Cart = () => {
  const [cartTotal, setCartTotal] = useState (0);
  const [cartData, setCartData] = useState ([]);
  const [loading, setLoading] = useState (false);
  const [refresh, setRefresh] = useState (false);
  const api = process.env.REACT_APP_API_URL;
  const navigate = useNavigate ();

  useEffect (
    () => {
      fetchCartData ();
      
    },
    // eslint-disable-next-line
    [refresh]
  );

  const getRefresh = () => {
    setRefresh (!refresh);
  };

  const fetchCartData = async () => {
    setLoading (true);

    try {
      const response = await fetch (
        `${api}/cart/getCartProducts`,
        {
          method: 'GET',
          mode: 'cors',
        }
      );

      if (!response.ok) {
        throw new Error (`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json ();
      setCartData (data.result);
      calculateCartTotal (data.result);
    } catch (error) {
      console.error ('Fetch error:', error);
    } finally {
      setLoading (false);
    }
  };

  const calculateCartTotal = products => {
    let total = 0;
    products.forEach (product => {
      total += product.productPrice;
    });
    setCartTotal (total);
  };

  return (
    <div>
      {loading
        ? <div className="center">
            Fetching Cart Products...
          </div>
        : <div>
            {cartData.length === 0
              ? <div className="center">
                  Your cart is empty. Add some products!
                </div>
              : <div className="cart-container">
                  {cartData.map ((product, index) => (
                    <ProductCard
                      key={index}
                      productId={product.productId}
                      productName={product.productName}
                      productPrice={product.productPrice}
                      productOccasion={product.productOccasion}
                      productImage={product.productImage}
                      getRefresh={getRefresh}
                    />
                  ))}
                </div>}

            {cartData.length > 0 &&
              <div className="total-container">
                <div className="total-text">Your Cart Total is {cartTotal}</div>
                <button
                  className="custom-button-fill"
                  onClick={() => navigate ('/payment')}
                >
                  <span className="button-text"> Proceed to checkout </span>
                </button>
              </div>}
          </div>}
    </div>
  );
};

export default Cart;
