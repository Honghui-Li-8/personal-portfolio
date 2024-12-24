import { color } from "framer-motion";
import { InnerBoundary } from "../constants/Dimension";

const PolygonInnerBlock = ({
  name,
  bBox,
  innerBoundary,
  x,
  y,
}: {
  name: string;
  bBox: { width: number; height: number };
  innerBoundary: InnerBoundary;
  x: number;
  y: number;
}) => {
  const top = innerBoundary.down - y; // since UI top (smaller y value) is math down (smaller y value)
  const left = innerBoundary.left - x;
  const width = innerBoundary.right - innerBoundary.left;
  const height = innerBoundary.top - innerBoundary.down;

  return (
    <foreignObject
      x={"" + x}
      y={"" + y}
      width={"" + bBox.width}
      height={"" + bBox.height}
    >
      <div
        id={name}
        style={{
          display:"flex",
          top,
          left,
          width,
          height,
          background: name === "ProjectGallery" ? "orange" : "none",
          opacity: 0.7,
          zIndex: 3,
          alignItems: "center",
          justifyContent:"center",
          position: "absolute",
        }}
      >
        {name}
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
