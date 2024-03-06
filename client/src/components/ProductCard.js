import React,{useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import "../css/card.css";
import "../css/search.css";
import RemoveFromCart from "./RemoveFromCart";
import AddToCart from "./AddToCart";


const ProductCard = ({productId,productName,productOccasion,productPrice,productImage,getRefresh}) => {
  const [toggleButton,setToggleButton] = useState(false)
  const [cartData, setCartData] = useState([])
   // eslint-disable-next-line
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  
   const fetchCartData = async () => {
    setLoading(true);
  
      try {
        const response = await fetch(`/api/cart/getCartProducts`, {
          method: "GET",
          mode: "cors",
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        setCartData(data.result);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
  }
  
  useEffect(() => {
    fetchCartData()
     // eslint-disable-next-line
  },[])
  useEffect(() => {
    
    if (cartData.some(item => item.productId === productId)) {
      setToggleButton(true);
    } else {
      setToggleButton(false);
    }
   },[cartData,productId])
   
  const addToCart = async(id) => {
    await fetch(`/api/cart/addToCart`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode:'cors',
      body: JSON.stringify({productId:productId,quantity:1})
  
    })
    console.log("Added", id)
    setToggleButton(true)
    getRefresh()
  }
  const removeFromCart = async (id) => {
    await fetch(`/api/cart/removeFromCart`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode:'cors',
      body: JSON.stringify({productId:productId,quantity:1})
  
    })
    console.log("removed",id)
    setToggleButton(false)
    getRefresh()
  }
  
  return (
    <div>
      <div className="grid">
        <div className="grid__item">
          <div className="card">
            <img
              className="card__img"
              src={productImage}
              alt={productName}
            />
            <div className="card__head">
              
              {productOccasion.map((occ, index) => (
              <span key={index} className="tag tag-blue">{occ}</span>))}
               
            </div>

            <div className="card__content">
              <h1 className="card__header" title={productName}>
                <strong>{productName}</strong>
                <div>Price: INR {productPrice}</div>
              </h1>
              <div className="footer-buttons">
              {toggleButton ? <RemoveFromCart id={productId} removeFromCart={removeFromCart} /> : <AddToCart id={productId} addToCart={addToCart}/>}
              <button
                className=" custom-button-fill"
                //Navigates to dynamic path and carries recipe object  
                onClick={() =>
                  navigate(`/${productId}`)
                }
              >
                Product Details
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
};

export default ProductCard;
