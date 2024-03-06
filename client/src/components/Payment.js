import React from "react"
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  return (
    <div className="center">
      Redirecting to payment gateway....
      <button className="center" onClick={() =>  navigate("/")}>Back</button>
    </div>
  )
};

export default Payment;
