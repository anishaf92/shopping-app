import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const RemoveFromCart = ({id,removeFromCart}) => {
  return (
    <button className="custom-button-fill" onClick={e => removeFromCart(id)}>
    Remove Item <FontAwesomeIcon icon={faTimes} />
</button> 
  )
};

export default RemoveFromCart;
