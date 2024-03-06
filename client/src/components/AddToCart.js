import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "../css/home.css"

const AddToCart = ({id,addToCart}) => {
  return (
    <button className="custom-button-fill" onClick={e => addToCart(id)}>
                Add to cart <FontAwesomeIcon
                  icon={faShoppingCart}
                />
    </button> 
  )
};

export default AddToCart;
