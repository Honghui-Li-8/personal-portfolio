import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PolygonSection from "../components/PolygonSection";
import Dimensions from "../constants/Dimension";
import image1 from "../asset/thumb.jpeg"

const Home = () => {
  const navigate = useNavigate();
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

  const goToTab = (tabName: string) => {
    navigate("/" + tabName);
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
      <div style={{
        backgroundImage: `url(${image1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: "#cccccc",
        width: "calc(100vw - 20px)",
        height: "calc(100vh - 20px)",
        borderRadius: "5px",
        overflow: "hidden",
      }}>
        <svg
          ref={svgContainerRef}
          style={{
            width: "calc(100vw - 20px)",
            height: "calc(100vh - 20px)",
            borderRadius: "5px",
            backgroundColor: "rgb(217, 250, 248, 0.05)",
            backdropFilter: "blur(0px)",
            pointerEvents: "none",
            overflow: "hidden",
            opacity: 1,
          }}
        >
          {layout1.map((vertices, index) => {
            return (
              <PolygonSection
                key={index}
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
    </div>
  );
};

export default Home;

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

const layout2: [number, number][][] = [
  [
    [0.0, 0.0],
    [0.215, 0.0],
    [0.186, 0.24],
    [0.0, 0.341],
  ],
  [
    [0.215, 0.0],
    [0.186, 0.24],
    [0.58, 0.025],
    [0.55, 0.0],
  ],
  [
    [0.55, 0.0],
    [0.58, 0.025],
    [0.627, 0.0],
  ],
  [
    [0.627, 0.0],
    [0.58, 0.025],
    [1.0, 0.382],
    [1.0, 0.0],
  ],
  [
    [0.0, 0.341],
    [0.186, 0.24],
    [0.103, 0.912],
    [0.0, 0.926],
  ],
  [
    [0.186, 0.24],
    [0.58, 0.025],
    [1.0, 0.382],
    [1.0, 0.625],
    [0.867, 0.809],
    [0.103, 0.912],
  ],
  [
    [1.0, 0.625],
    [0.867, 0.809],
    [1.0, 0.791],
  ],
  [
    [0.0, 0.926],
    [0.103, 0.912],
    [0.092, 1.0],
    [0.0, 1.0],
  ],
  [
    [0.092, 1.0],
    [0.103, 0.912],
    [0.867, 0.809],
    [0.729, 1.0],
  ],
  [
    [0.729, 1.0],
    [0.867, 0.809],
    [1.0, 0.791],
    [1.0, 1.0],
  ],
];

const layout3: [number, number][][] = [
  [
    [0.0, 0.0],
    [0.194, 0.0],
    [0.149, 0.282],
    [0.0, 0.361],
  ],
  [
    [0.194, 0.0],
    [0.149, 0.282],
    [0.634, 0.023],
    [0.601, 0.0],
  ],
  [
    [0.601, 0.0],
    [0.634, 0.023],
    [0.678, 0.0],
  ],
  [
    [0.678, 0.0],
    [0.634, 0.023],
    [1.0, 0.28],
    [1.0, 0.0],
  ],
  [
    [0.0, 0.361],
    [0.149, 0.282],
    [0.047, 0.92],
    [0.0, 0.926],
  ],
  [
    [0.149, 0.282],
    [0.634, 0.023],
    [1.0, 0.28],
    [1.0, 0.625],
    [0.867, 0.809],
    [0.047, 0.92],
  ],
  [
    [1.0, 0.625],
    [0.867, 0.809],
    [1.0, 0.791],
  ],
  [
    [0.0, 0.926],
    [0.047, 0.92],
    [0.034, 1.0],
    [0.0, 1.0],
  ],
  [
    [0.034, 1.0],
    [0.047, 0.92],
    [0.867, 0.809],
    [0.729, 1.0],
  ],
  [
    [0.729, 1.0],
    [0.867, 0.809],
    [1.0, 0.791],
    [1.0, 1.0],
  ],
];
