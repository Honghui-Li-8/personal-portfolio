import React, { useEffect, useMemo, useRef, useState } from "react";
import Dimensions, { InnerBoundary } from "../constants/Dimension";
import PolygonInnerBlock from "./PolygonInnerBlock";

// const calculateCentroid = (
//   vertices: [number, number][],
//   dimensions: Dimensions
// ) => {
//   const numPoints = vertices.length;
//   const centroid = vertices.reduce(
//     (acc, vertex) => {
//       acc.x += vertex[0] * dimensions.width;
//       acc.y += vertex[1] * dimensions.height;
//       return acc;
//     },
//     { x: 0, y: 0 }
//   );

//   return {
//     x: centroid.x / numPoints,
//     y: centroid.y / numPoints,
//   };
// };

const calculateInnerBoundary = (
  vertices: [number, number][],
  dimensions: Dimensions
): [InnerBoundary, number, number] => {
  // Locate 2 most outset point on all 4 direction
  let left = [vertices[0][0], vertices[0][0]];
  let right = [vertices[0][0], vertices[0][0]];
  let top = [vertices[0][1], vertices[0][1]];
  let down = [vertices[0][1], vertices[0][1]];

  for (let i = 1; i < vertices.length; ++i) {
    const cx = vertices[i][0];
    const cy = vertices[i][1];

    // 1) left
    if (cx < left[0]) {
      // most left
      left[1] = left[0];
      left[0] = cx;
    } else if (cx < left[1]) {
      // 2nd most left
      left[1] = cx;
    }

    // 2) right
    if (cx > right[0]) {
      // most right
      right[1] = right[0];
      right[0] = cx;
    } else if (cx > right[1]) {
      // 2nd most right
      right[1] = cx;
    }

    // 3) top
    if (cy > top[0]) {
      // most top
      top[1] = top[0];
      top[0] = cy;
    } else if (cy > top[1]) {
      // 2nd most top
      top[1] = cy;
    }

    // 4) down
    if (cy < down[0]) {
      // most down
      down[1] = down[0];
      down[0] = cy;
    } else if (cy < down[1]) {
      // 2nd most down
      down[1] = cy;
    }
  }

  return [
    {
      left: ((left[0] + left[1]) / 2) * dimensions.width,
      right: ((right[0] + right[1]) / 2) * dimensions.width,
      top: ((top[0] + top[1]) / 2) * dimensions.height,
      down: ((down[0] + down[1]) / 2) * dimensions.height,
    },
    left[0] * dimensions.width,
    down[0] * dimensions.height,
  ];
};

const calculatePoints = (
  vertices: [number, number][],
  dimensions: Dimensions
): string => {
  let result = "";

  for (let i = 0; i < vertices.length; ++i) {
    let x: number = Math.round(vertices[i][0] * dimensions.width * 10) / 10;
    let y: number = Math.round(vertices[i][1] * dimensions.height * 10) / 10;

    if (vertices[i][0] === 0) {
      x -= 5;
    } else if (vertices[i][0] === 1) {
      x += 5;
    }

    if (vertices[i][1] === 0) {
      y -= 5;
    } else if (vertices[i][1] === 1) {
      x += 5;
    }

    result += x.toString() + ", " + y.toString();

    if (i !== vertices.length - 1) {
      result += ", ";
    }
  }

  // console.log("????????")
  // console.log(result)
  return result;
};

const PolygonSection = ({
  dimensions,
  vertices,
  color,
  name,
  onClick,
}: {
  dimensions: Dimensions;
  vertices: [number, number][];
  color: string;
  name: string;
  onClick: React.MouseEventHandler<SVGPolygonElement>;
}) => {
  const polygonRef = useRef<SVGPolygonElement | null>(null);
  const [bBox, setBBox] = useState({ width: 0, height: 0 });
  const [hovered, setHovered] = useState(false);

  // Handle hover state for the entire SVG (polygon + text)
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const innerBoundaryVar = useMemo(
    () => calculateInnerBoundary(vertices, dimensions),
    [vertices, dimensions]
  );
  const points = useMemo(
    () => calculatePoints(vertices, dimensions),
    [vertices, dimensions]
  );

  useEffect(() => {
    if (polygonRef.current) {
      const bbox = polygonRef.current.getBBox();
      setBBox({
        width: bbox.width,
        height: bbox.height,
      });
    }
  }, [innerBoundaryVar]); // weird but works, need to wait for polygon finish drawing to get the bbox

  // Scaling the text on hover
  const textScale = hovered ? 1.3 : 1; // Expand the text by 30% on hover
  // const fill = !hovered ? "rgb(54, 101, 145, 0.7)" : "url(#gradient-bg)";
  // const fill = hovered ? "blue" : "lightblue";
  const fill = "url(#gradient-bg)";
  // const fillOpacity= hovered ? 0.9: 0.5;
  const fillOpacity = hovered ? 1 : 0.5;

  return (
    <g>
      <polygon
        ref={polygonRef}
        points={points}
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
        bBox={bBox}
        innerBoundary={innerBoundaryVar[0]}
        x={innerBoundaryVar[1]}
        y={innerBoundaryVar[2]}
      />
    </g>
  );
};

export default PolygonSection;
