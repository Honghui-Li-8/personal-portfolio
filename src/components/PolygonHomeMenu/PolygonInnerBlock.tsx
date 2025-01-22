import { color } from "framer-motion";
import Dimensions, { InnerBoundary } from "../../constants/Dimension";
import {calculateInnerBoundary} from "../../scripts/polygonUtility";
import {useState} from "react";

const PolygonInnerBlock = ({
  name,
  index,
  vertices,
  dimensions,
  bBox,
}: {
  name: string;
  index:number;
  vertices: [number, number][];
  dimensions: Dimensions;
  bBox: { width: number; height: number };
}) => {
  const boundary = calculateInnerBoundary(vertices, dimensions);
  const x = boundary.x;
  const y = boundary.y;
  const top = boundary.down - boundary.y; // since UI top (smaller y value) is math down (smaller y value)
  let left = boundary.left - boundary.x;
  const width = boundary.right - boundary.left;
  let height = boundary.top - boundary.down;
  
  if (index === 2) {
    height *= 1.5;
    left += width / 10;
  }

  return (
    <foreignObject
      x={"" + x}
      y={"" + y}
      width={"" + bBox.width}
      height={"" + bBox.height}
      style={{
        transition: "all 0.3s ease-in-out",
      }}
    >
      <div
        style={{
          display: "flex",
          width: bBox.width,
          height: bBox.height,
          // background: "yellow",
          background: index === 4 ? "yellow" : "none",
          opacity: 0.7,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          id={name}
          style={{
            display: "flex",
            top,
            left,
            width,
            height,
            // background: "orange",
            // background: name === "Credit" ? "orange" : "none",
            background: index === 4 ? "orange" : "none",
            opacity: 0.7,
            zIndex: 3,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            transition: "all 0.3s ease-in-out",
            // transition: "width 0.5s ease-in-out, height 0.5s ease-in-out",
          }}
        >
          {name}
        </div>
      </div>
    </foreignObject>
    // <text
    //   // x={centroid.x}
    //   // y={centroid.y}
    //   // dominantBaseline="middle"
    //   // textAnchor="middle"
    //   // fill="black"
    //   // fontSize="20"
    //   // fontWeight="bold"
    //   // transform={`translate(${centroid.x}, ${
    //   //   centroid.y
    //   // }) scale(${textScale}) translate(${-centroid.x}, ${-centroid.y})`}
    //   // style={{
    //   //   pointerEvents: "none",
    //   //   transition: "transform 0.2s ease",
    //   //   userSelect: "none",
    //   // }}
    // >
    //   {name}
    // </text>
  );
};

export default PolygonInnerBlock;
