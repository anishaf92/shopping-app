import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import AddToCart from './AddToCart';
import RemoveFromCart from './RemoveFromCart';
import '../css/productDetail.css';

const ProductDetails = () => {
  const {id} = useParams ();
  const [product, setProduct] = useState ({});
  const [toggleButton, setToggleButton] = useState (false);
  // eslint-disable-next-line
  const [refresh, setRefresh] = useState (false);
  const [cartData, setCartData] = useState ([]);
  const navigate = useNavigate ();
  useEffect (
    () => {
      fetchProductDetails ();
     
    },
     // eslint-disable-next-line
    [refresh]
  );
  const fetchProductDetails = async () => {
    try {
      const response = await fetch (
        `/api/product/getProductById/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error (`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json ();
      setProduct (result.result[0]);
      console.log (result.result[0]);
    } catch (error) {
      console.error ('Search error:', error);
    }
  };
  const fetchCartData = async () => {
    try {
      const response = await fetch (
        `/api/cart/getCartProducts`,
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
    } catch (error) {
      console.error ('Fetch error:', error);
    }
  };
  useEffect (() => {
    fetchCartData ();
    //eslint-disable-next-line
  }, []);
  useEffect (
    () => {
      if (cartData.some (item => item.productId === product._id)) {
        setToggleButton (true);
      } else {
        setToggleButton (false);
      }
    },
     // eslint-disable-next-line
    [cartData]
  );

  const addToCart = async id => {
    await fetch (`/api/cart/addToCart`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify ({productId: product._id, quantity: 1}),
    });
    console.log ('Added', id);
    setToggleButton (true);
  };
  const removeFromCart = async id => {
    await fetch (`/api/cart/removeFromCart`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify ({productId: product._id, quantity: 1}),
    });
    console.log ('removed', id);
    setToggleButton (false);
  };

  return (
    <div className="product__detail">
      <div className="product__card">
        <img
          alt={product.name}
          className="product__img"
          src={product.image_url}
        />
        <div className="details">
          <h1 className="title">{product.name}</h1>
          <h3>Price: INR {product.price}</h3>
          <h3>Material: {product.material}</h3>
          <h3>
            Occasion:&nbsp;
            {Array.isArray (product.occasion) &&
              product.occasion.map ((item, index) => (
                <div className="keyword" key={index}>
                  <li>{item}</li>
                </div>
              ))}
          </h3>
          <h3>Description: </h3>

          <div className="description">
            {product.description}
          </div>
          <div className="button_product">
            {toggleButton
              ? <RemoveFromCart
                  id={product._id}
                  removeFromCart={removeFromCart}
                />
              : <AddToCart id={product._id} addToCart={addToCart} />}
          </div>

        </div>
      </div>

      {/* Button to navigate to homepage */}
      <div className="center">
        <button
          className="back__btn"
          onClick={() => {
            navigate ('/');
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
