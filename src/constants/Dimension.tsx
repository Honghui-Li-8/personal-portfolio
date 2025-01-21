type Dimensions = { 
  width: number; 
  height: number;
};

export interface InnerBoundary {
  left:number,
  right:number,
  top:number,
  down:number,
  x:number,
  y:number
}

export default Dimensions;