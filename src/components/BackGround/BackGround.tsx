import React, { useState, useEffect, useRef } from "react";
import "./BackGround.css";
import { RootState } from "../../store/datastore";
import { useSelector } from "react-redux";

type Position = "static" | "relative" | "absolute" | "sticky" | "fixed";
const lightBlue = "#f4f9fc";
const blue = "#add8e6";
const green = "#ccff99";
const orange = "#ffcc99";

const BackGround = () => {
  const [bgColor, setBgColor] = React.useState("black");
  const [newbgColor, setNewbgColor] = React.useState("#add8e6");
  const [showTransaction, setShowTransaction] = React.useState(false);
  const [circleSize, setCircleSize] = useState({ width: 20, height: 20 });
  const activeTab = useSelector((state: RootState) => state.routerState.route);
  const activeTabRef = useRef(activeTab);
  // Ref for the circle element
  const bgRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const animate = true;


  // update the ref of queue
  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  /********** trigger animation when tab switch **********/
  useEffect(() => {
    switch (activeTab) {
      case "Home":
        setNewbgColor("#2D1F56");
        break;
      case "About":
        setNewbgColor(blue);
        break;
      case "Contact":
        setNewbgColor(green);
        break;
      case "Projects":
        setNewbgColor(orange);
        break;
      default:
        setNewbgColor("#ffffff");
    }

    console.log("tab", activeTab)
    console.log("new bg", newbgColor)
    setShowTransaction(true);
  }, [activeTab]);

  /********** Rescale Background **********/
  const rescaleToFitScreen = () => {
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;

    // prevent extrme screen scale
    if (viewportHeight > viewportWidth * 1.5) {
      // to offset the 1707/898 pre defined ratio
      viewportWidth = viewportHeight * 1.5;
    }

    const newWidth = (viewportWidth / 1707) * 20;
    const newHeight = (viewportHeight / 898) * 20;

    setCircleSize({ width: newWidth, height: newHeight });
  };

  useEffect(() => {
    rescaleToFitScreen();
  }, []);

  // prevent too frequent update on windows resize
  const debounce = (func: () => void, delay: number): () => void => {
    let debounceTimer: ReturnType<typeof setTimeout>;

    return function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {func()}, delay);
    };
  };

  /****** Attach Event Listener for background animation ******/
  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) {
      return;
    }

    console.log("===== added listener for background animation component ======");
    // Handler for the animationend event
    const handleAnimationEnd = () => {
      console.log("Animation completed!");
      setBgColor(newbgColor);
      setShowTransaction(false);
      console.log("new bg", showTransaction);
      // console.log(bgColor);
    };

    // Add event listener
    circle.addEventListener("animationend", handleAnimationEnd);

    // Cleanup
    return () => circle.removeEventListener("animationend", handleAnimationEnd);
  }, [showTransaction]);

  /*********** update bg color ***********/
  useEffect(() => {
    if (bgRef.current) {
      // Check if the ref is attached to an element
      bgRef.current.style.backgroundColor = bgColor;
      console.log(bgColor);
    }
  }, [bgColor]);

  // Inline styles for the circle and container
  const styles = {
    container: {
      position: "fixed" as Position,
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      backgroundColor: bgColor, // Use the bgColor prop for background color
      zIndex: -1, // Stay behind other content
      opacity: 0.8
    },
    circle: {
      width: `${circleSize.width}px`,
      height: `${circleSize.height}px`,
      borderRadius: "50%",
      backgroundColor: newbgColor, // Use the bgColor prop for background color
      transform: "scale(0)",
      animation: animate ? "expand 2s forwards" : "none",
      zIndex: 20, // Stay behind other content
    },
  };

  window.addEventListener("resize", debounce(rescaleToFitScreen, 250));

  return (
    <div style={styles.container} ref={bgRef}>
      {showTransaction && <div style={styles.circle} ref={circleRef} />}
      {/* <div id="circle-" style={styles.circle} ref={circleRef}/> */}
    </div>
  );
};

export default BackGround;
