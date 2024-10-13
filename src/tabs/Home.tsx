import React from "react";
import { useNavigate } from "react-router-dom";
import PolygonSection from "../components/PolygonSection";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/About");
  };

  return (
    <div>
      <svg style={{ pointerEvents: "none" }}>
        <PolygonSection
          points="60,20 140,150 30,150"
          color="#6666FF"
          name="test"
          onClick={() => {}}
        />
      </svg>
    </div>
  );
};

export default Home;
