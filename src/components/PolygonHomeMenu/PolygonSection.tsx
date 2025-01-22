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
  setFocusIndex,
}: {
  index: number;
  focusIndex: number;
  dimensions: Dimensions;
  color: string;
  name: string;
  onClick: React.MouseEventHandler<SVGPolygonElement>;
  setFocusIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const polygonRef = useRef<SVGPolygonElement | null>(null);
  const [bBox, setBBox] = useState({ width: 0, height: 0 });
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [vertices, setVertices] = useState(layout_initial[index]);
  const [points, setPoints] = useState(
    calculatePoints(layout_initial[index], dimensions)
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
    if (focusIndex === 5) {
      setVertices(layout_focus_5[index]);
      setPoints(calculatePoints(layout_focus_5[index], dimensions));
    } else {
      setVertices(layout_base[index]);
      setPoints(calculatePoints(layout_base[index], dimensions));
    }
  }, [loaded, focusIndex, index, dimensions]);

  // Handle hover state for the entire SVG (polygon + text)
  const handleMouseEnter = () => {
    if (index === 5) {
      setFocusIndex(index);
    }

    setHovered(true);
  };

  const handleMouseLeave = () => {
    if (index === 5) {
      setFocusIndex(-1);
    }

    setHovered(false);
  };

  /***** Wait for polygon drawing *****/
  useEffect(() => {
    const updateBBox = () => {
      if (!polygonRef.current) return;

      const bbox = polygonRef.current.getBBox();
      setBBox({
        width: bbox.width,
        height: bbox.height,
      });
    };

    // Initial bounding box measurement
    updateBBox();

    // // Use ResizeObserver to auto-update on size changes
    if (!polygonRef.current) return;
    const observer = new ResizeObserver(updateBBox);
    observer.observe(polygonRef.current);

    return () => observer.disconnect();
  }, [loaded]); // need to wait for polygon finish drawing to get the bbox

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
        vertices={vertices}
        dimensions={dimensions}
        bBox={bBox}
      />
    </g>
  );
};

export default PolygonSection;
