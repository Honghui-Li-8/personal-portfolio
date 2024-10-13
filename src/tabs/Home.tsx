import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PolygonSection from "../components/PolygonSection";
import Dimensions from "../constants/Dimension";

const Home = () => {
  const navigate = useNavigate();
  const svgContainerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (svgContainerRef.current) {
      const { width, height } = svgContainerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  const handleClick = () => {
    navigate("/About");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      <svg
        ref={svgContainerRef}
        style={{
          width: "calc(100vw - 20px)",
          height: "calc(100vh - 20px)",
          borderRadius: "5px",
          backgroundColor: "lightblue",
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {layout1.map((vertices, index) => {
          return (
            <PolygonSection
              dimensions={dimensions}
              vertices={vertices}
              color="#6666FF"
              name={"section_" + index.toString()}
              onClick={() => {}}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default Home;

const layout1: [number, number][][] = [
  [
    [0.0, 0.0],
    [0.215, 0.0],
    [0.175, 0.328],
    [0.0, 0.443],
  ],
  [
    [0.215, 0.0],
    [0.175, 0.328],
    [0.583, 0.062],
    [0.514, 0.0],
  ],
  [
    [0.514, 0.0],
    [0.583, 0.062],
    [0.678, 0.0],
  ],
  [
    [0.678, 0.0],
    [0.583, 0.062],
    [1.0, 0.432],
    [1.0, 0.0],
  ],
  [
    [0.0, 0.443],
    [0.175, 0.328],
    [0.107, 0.882],
    [0.0, 0.895],
  ],
  [
    [0.175, 0.328],
    [0.583, 0.062],
    [1.0, 0.432],
    [1.0, 0.625],
    [0.885, 0.785],
    [0.107, 0.882],
  ],
  [
    [1.0, 0.625],
    [0.885, 0.785],
    [1.0, 0.771],
  ],
  [
    [0.0, 0.895],
    [0.107, 0.882],
    [0.092, 1.0],
    [0.0, 1.0],
  ],
  [
    [0.092, 1.0],
    [0.107, 0.882],
    [0.885, 0.785],
    [0.729, 1.0],
  ],
  [
    [0.729, 1.0],
    [0.885, 0.785],
    [1.0, 0.771],
    [1.0, 1.0],
  ],
];
