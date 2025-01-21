import React, { useEffect, useMemo, useRef, useState } from "react";
import Dimensions, { InnerBoundary } from "../../constants/Dimension";
import PolygonInnerBlock from "./PolygonInnerBlock";
import {
  layout_base,
  layout_focus_5,
  layout_initial,
} from "./PolygonSectionData";
import {
  calculateInnerBoundary,
  calculatePoints,
} from "../../scripts/polygonUtility";
import { useSpring, animated } from "@react-spring/web";

const PolygonSection = ({
  index,
  focusIndex,
  dimensions,
  color,
  name,
  onClick,
}: {
  index: number;
  focusIndex: number;
  dimensions: Dimensions;
  color: string;
  name: string;
  onClick: React.MouseEventHandler<SVGPolygonElement>;
}) => {
  const polygonRef = useRef<SVGPolygonElement | null>(null);
  const [bBox, setBBox] = useState({ width: 0, height: 0 });
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [points, setPoints] = useState(
    calculatePoints(layout_initial[index], dimensions)
  );
  // const [points, setPoints] = useState(calculatePoints(layout_base[index], dimensions));
  const [innerBoundary, setInnerBoundary] = useState(
    calculateInnerBoundary(layout_base[index], dimensions)
  );
  // const vertices: [number, number][] = layout_base[index]; //-----------------

  const animatedProps = useSpring({
    from: {
      points: calculatePoints(layout_initial[index], dimensions), // Initial collapsed state
    },
    to: {
      points, // Target points from state
    },
    config: { tension: 120, friction: 14 }, // Control smoothness
    // immediate: !loaded, // remove animation on first load
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 250); // 0.5 seconds

    return () => clearTimeout(timer); // Cleanup to avoid memory leaks
  }, []);

  useEffect(() => {
    // const vertices: [number, number][] = layout_base[index];
    // if (!loaded) {
    //   setPoints(calculatePoints(layout_initial[index], dimensions));
    //   setInnerBoundary(calculateInnerBoundary(layout_initial[index], dimensions));
    //   return;
    // }

    if (focusIndex === 5) {
      setPoints(calculatePoints(layout_focus_5[index], dimensions));
      setInnerBoundary(
        calculateInnerBoundary(layout_focus_5[index], dimensions)
      );
    } else {
      setPoints(calculatePoints(layout_base[index], dimensions));
      setInnerBoundary(calculateInnerBoundary(layout_base[index], dimensions));
    }
  }, [loaded, focusIndex, index, dimensions]);

  // Handle hover state for the entire SVG (polygon + text)
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  /***** Wait for polygon drawing *****/
  useEffect(() => {
    if (polygonRef.current) {
      const bbox = polygonRef.current.getBBox();
      setBBox({
        width: bbox.width,
        height: bbox.height,
      });
    }
  }, [loaded, innerBoundary]); // weird but works, need to wait for polygon finish drawing to get the bbox

  // Scaling the text on hover
  const textScale = hovered ? 1.3 : 1; // Expand the text by 30% on hover
  // const fill = !hovered ? "rgb(54, 101, 145, 0.7)" : "url(#gradient-bg)";
  // const fill = hovered ? "blue" : "lightblue";
  const fill = "url(#gradient-bg)";
  // const fillOpacity= hovered ? 0.9: 0.5;
  const fillOpacity = hovered ? 1 : 0.5;

  return (
    <g>
      <animated.polygon
        ref={polygonRef}
        points={animatedProps.points}
        // fill={"url(#gradient-bg)"}
        fill={fill}
        stroke="#caf0f8"
        strokeWidth="5"
        fillOpacity={fillOpacity}
        style={{
          pointerEvents: "all", // Ensure only the polygon handles pointer events
          // background: "white",
          // backgroundColor: "white",
          backdropFilter: "blur(10px)",
          overflow: "hidden",
          transition: "fill 0.5s ease-out, fill-opacity 0.5s ease-out",
          // transition: "fill 0.5s ease, fill-opacity 0.5s ease"
        }}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      {/* The polygon name text */}
      <PolygonInnerBlock
        name={name}
        index={index}
        bBox={bBox}
        innerBoundary={innerBoundary}
      />
    </g>
  );
};

export default PolygonSection;
