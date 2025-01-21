import { color } from "framer-motion";
import { InnerBoundary } from "../../constants/Dimension";

const PolygonInnerBlock = ({
  name,
  index,
  bBox,
  innerBoundary,
}: {
  name: string;
  index:number;
  bBox: { width: number; height: number };
  innerBoundary: InnerBoundary;
}) => {
  const x = innerBoundary.x;
  const y = innerBoundary.y;
  const top = innerBoundary.down - innerBoundary.y; // since UI top (smaller y value) is math down (smaller y value)
  let left = innerBoundary.left - innerBoundary.x;
  const width = innerBoundary.right - innerBoundary.left;
  let height = innerBoundary.top - innerBoundary.down;
  
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
    >
      <div
        style={{
          display: "flex",
          width: bBox.width,
          height: bBox.height,
          background: "yellow",
          // background: index === 2 ? "yellow" : "none",
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
            background: "none",
            // background: name === "Credit" ? "orange" : "none",
            opacity: 0.7,
            zIndex: 3,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
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
