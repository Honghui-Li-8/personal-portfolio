import React, { useMemo, useState } from "react";

const calculateCentroid = (points: string) => {
  const vertices = points.split(" ").map(point => {
    const [x, y] = point.split(",").map(Number);
    return { x, y };
  });

  const numPoints = vertices.length;
  const centroid = vertices.reduce(
    (acc, vertex) => {
      acc.x += vertex.x;
      acc.y += vertex.y;
      return acc;
    },
    { x: 0, y: 0 }
  );

  return {
    x: centroid.x / numPoints,
    y: centroid.y / numPoints,
  };
};

const PolygonSection = ({
  points,
  color,
  name,
  onClick,
}: {
  points: string;
  color: string;
  name: string;
  onClick: React.MouseEventHandler<SVGPolygonElement>;
}) => {
  const [hovered, setHovered] = useState(false);

  // Handle hover state for the entire SVG (polygon + text)
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const centroid = useMemo(() => calculateCentroid(points), [points]);
  
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
        transform={`translate(${centroid.x}, ${centroid.y}) scale(${textScale}) translate(${-centroid.x}, ${-centroid.y})`} 
        style={{
          pointerEvents: "none",
          transition: "transform 0.2s ease",
          userSelect: "none"
        }}
      >
        {name}
      </text>
    </g>
  );
};

export default PolygonSection;
