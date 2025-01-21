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
  const [focusIndex, setFocusIndex] = useState(0);


  const goToTab = (tabName: string) => {
    dispatch(navigate({ newRoute: tabName }));
  };

  return (
    <svg ref={svgContainerRef} style={styles.svgContainer}>
      <LinearGradientDefine />
      {sectionName.map((name, index) => {
        return (
          <PolygonSection
            key={index}
            index={index}
            focusIndex={focusIndex}
            dimensions={dimensions}
            color="transparent"
            name={name}
            onClick={() => {
              if (index === focusIndex) 
                goToTab(name);
              else
                setFocusIndex(index);
            }}
          />
        );
      })}
    </svg>
  );
};

const LinearGradientDefine = () => {
  return (
    <defs>
      <linearGradient id="gradient-bg" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: "#0277bd", stopOpacity: 0.95 }} />
        {/* <stop offset="0%" style={{stopColor:"", stopOpacity:0.95}} /> dark-mode */}
        <stop
          offset="100%"
          style={{ stopColor: "#4a148c", stopOpacity: 0.85 }}
        />
      </linearGradient>
    </defs>
  );
};

export default PolygonHomeMenu;

const styles: { [key: string]: React.CSSProperties } = {
  svgContainer: {
    width: "calc(100vw - 20px)",
    height: "calc(100vh - 20px)",
    borderRadius: "5px",
    // backgroundColor: "rgb(217, 250, 248, 0.05)",
    // backdropFilter: "blur(0px)",
    pointerEvents: "none",
    overflow: "hidden",
    opacity: 1,
  },
};

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
