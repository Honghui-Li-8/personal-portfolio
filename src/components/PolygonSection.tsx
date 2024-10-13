import React, { useMemo, useState } from "react";
import Dimensions from "../constants/Dimension";

const calculateCentroid = (vertices: [number, number][], dimensions:Dimensions) => {
  const numPoints = vertices.length;
  const centroid = vertices.reduce(
    (acc, vertex) => {
      acc.x += vertex[0] * dimensions.width;
      acc.y += vertex[1] * dimensions.height;
      return acc;
    },
    { x: 0, y: 0 }
  );

  return {
    x: centroid.x / numPoints,
    y: centroid.y / numPoints,
  };
};

const calculatePoints = (
  vertices: [number, number][],
  dimensions: Dimensions
): string => {
  let result = "";

  for (let i = 0; i < vertices.length; ++i) {
    let x:number = Math.round(vertices[i][0] * dimensions.width * 10) / 10;
    let y:number = Math.round(vertices[i][1] * dimensions.height * 10) / 10;

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

  console.log("????????")
  console.log(result)
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
  const [hovered, setHovered] = useState(false);

  // Handle hover state for the entire SVG (polygon + text)
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const centroid = useMemo(() => calculateCentroid(vertices, dimensions), [vertices, dimensions]);
  const points = useMemo(
    () => calculatePoints(vertices, dimensions),
    [vertices, dimensions]
  );

  // Scaling the text on hover
  const textScale = hovered ? 1.3 : 1; // Expand the text by 30% on hover

  return (
    <g>
      <polygon
        points={points}
        fill={color}
        stroke="lightblue"
        strokeWidth="5"
        style={{
          pointerEvents: "all", // Ensure only the polygon handles pointer events
        }}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      {/* The polygon name text */}
      <text
        x={centroid.x}
        y={centroid.y}
        dominantBaseline="middle"
        textAnchor="middle"
        fill="black"
        fontSize="20"
        fontWeight="bold"
        transform={`translate(${centroid.x}, ${
          centroid.y
        }) scale(${textScale}) translate(${-centroid.x}, ${-centroid.y})`}
        style={{
          pointerEvents: "none",
          transition: "transform 0.2s ease",
          userSelect: "none",
        }}
      >
        {name}
      </text>
    </g>
  );
};

export default PolygonSection;
