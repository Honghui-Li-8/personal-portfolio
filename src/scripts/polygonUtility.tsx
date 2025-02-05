import Dimensions, {InnerBoundary} from "../constants/Dimension";

export const calculateCentroid = (
  vertices: [number, number][],
  dimensions: Dimensions
) => {
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


// used vertex (0-1)
export const calculateInnerBoundary = (
  vertices: [number, number][],
  dimensions: Dimensions
): InnerBoundary => {
  // Locate 2 most outset point on all 4 direction
  let left = [99999, 99999];
  let right = [-1, -1];
  let top = [-1, -1];
  let down = [99999, 99999];

  for (let i = 0; i < vertices.length; ++i) {
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
      // special case for middle block, ignore right tie case
      if (vertices.length !== 6 ||  cx !== right[0]) {
        // 2nd most right
        right[1] = cx;
      }
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

  const result = {
    left: ((left[0] + left[1]) / 2) * dimensions.width,
    right: ((right[0] + right[1]) / 2) * dimensions.width,
    top: ((top[0] + top[1]) / 2) * dimensions.height,
    down: ((down[0] + down[1]) / 2) * dimensions.height,
    x: left[0] * dimensions.width,
    y: down[0] * dimensions.height,
  };

  
  
  // if (vertices[0][0] === 0.729 || vertices[0][0] === 0.773) {
  //   // console.log(vertices)
  //   console.log(left)
  //   // console.log(dimensions.width)
  //   console.info(result.left)
  // }

  return result;
};

export const calculatePoints = (
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
      y += 5;
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