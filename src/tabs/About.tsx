import React from "react";
import {navigate} from "../store/RouterSlice"
import {AppDispatch} from "../store/datastore";
import {useDispatch} from "react-redux";


const About = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    dispatch(navigate({newRoute: 'Home'}));
  };

  return (
    <div>
      <h2>
        About Page
      </h2>
      <button onClick={handleClick}>Go to Home</button>
    </div>
  )
}

export default About;