import React, { useEffect, useRef, useState } from "react";
import PolygonSection from "../PolygonHomeMenu/PolygonSection";
import Dimensions from "../../constants/Dimension";
import image1 from "../../asset/thumb2.jpeg";
import { AppDispatch } from "../../store/datastore";
import { useDispatch } from "react-redux";
import { navigate } from "../../store/RouterSlice";

const PolygonHomeMenu = ({
  dimensions,
  svgContainerRef,
}: {
  dimensions: Dimensions;
  svgContainerRef: React.RefObject<SVGSVGElement>;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const goToTab = (tabName: string) => {
    dispatch(navigate({ newRoute: tabName }));
  };

  return (
    <div
      style={{
        backgroundColor: "transparent",
        width: "100%",
        height: "100%",
      }}
    >
      <svg
        ref={svgContainerRef}
        style={{
          width: "calc(100vw - 20px)",
          height: "calc(100vh - 20px)",
          borderRadius: "5px",
          backgroundColor: "rgb(217, 250, 248, 0.05)",
          // backdropFilter: "blur(0px)",
          pointerEvents: "none",
          overflow: "hidden",
          opacity: 1,
        }}
      >
        {/* <!-- Define the blur filter --> */}
        <defs>
          <linearGradient id="gradient-bg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "#0277bd", stopOpacity: 0.95 }}
            />
            {/* <stop offset="0%" style={{stopColor:"", stopOpacity:0.95}} /> dark-mode */}
            <stop
              offset="100%"
              style={{ stopColor: "#4a148c", stopOpacity: 0.85 }}
            />
          </linearGradient>
        </defs>
        {layout1.map((vertices, index) => {
          return (
            <PolygonSection
              key={index}
              index={index}
              dimensions={dimensions}
              vertices={vertices}
              color="transparent"
              name={sectionName[index]}
              onClick={() => {
                goToTab(sectionName[index]);
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default PolygonHomeMenu;

const sectionName: string[] = [
  "Menu",
  "About",
  "=",
  "Contact",
  "Tour",
  "Main",
  "Credit",
  "Playground",
  "ProjectGallery",
  "Resume",
];

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
