import React from "react";
import { useNavigate } from "react-router-dom";
import PolygonSection from "../components/PolygonSection";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/About");
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', backgroundColor:"white"}}>
      <svg style={{width: 'calc(100vw - 20px)', height: 'calc(100vh - 20px)', borderRadius: '5px', backgroundColor:"lightblue", pointerEvents: "none", overflow: 'hidden' }}>
        <PolygonSection
          points="-5,-5 400,-5 -5,650"
          color="#6666FF"
          name="test"
          onClick={() => {}}
        />
      </svg>
    </div>
  );
};

export default Home;
