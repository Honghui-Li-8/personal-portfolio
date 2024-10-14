import React from "react";
import { useNavigate } from 'react-router-dom';


const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>
        Page Not Found
      </h2>
      <button onClick={handleClick}>Go to Home</button>
    </div>
  )
}

export default NotFound;