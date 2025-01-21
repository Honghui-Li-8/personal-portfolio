import React, { useEffect, useRef, useState } from "react";
import PolygonSection from "../components/PolygonHomeMenu/PolygonSection";
import Dimensions from "../constants/Dimension";
import image1 from "../asset/thumb2.jpeg";
import { AppDispatch } from "../store/datastore";
import { useDispatch } from "react-redux";
import { navigate } from "../store/RouterSlice";
import PolygonHomeMenu from "../components/PolygonHomeMenu/PolygonHomeMenu";

const Home = () => {
  const svgContainerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (svgContainerRef.current) {
        const { width, height } =
          svgContainerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        // backgroundColor: "white",
      }}
    >
      <div
        style={{
          backgroundImage: `url(${image1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "transparent",
          width: "calc(100vw - 20px)",
          height: "calc(100vh - 20px)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <PolygonHomeMenu
          dimensions={dimensions}
          svgContainerRef={svgContainerRef}
        />
      </div>
    </div>
  );
};

export default Home;
