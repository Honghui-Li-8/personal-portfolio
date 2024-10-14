import React, { useState, useEffect, useRef } from 'react';
import "./BackGround.css";

const BackGround = ({ showTransation, bgColor, newbgColor, animate = true, onAnimationEnd }) => {
  const [circleSize, setCircleSize] = useState({ width: 20, height: 20 });
  // Ref for the circle element
  const circleRef = useRef(null);
  const bgRef = useRef(null);
  
  const rescaleToFitScreen = () => {
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;

    // prevent extrme screen scale
    if (viewportHeight > viewportWidth * 1.5) {
      // to offset the 1707/898 pre defined ratio
      viewportWidth = viewportHeight * 1.5;
    }
  
    const newWidth = viewportWidth / 1707 * 20;
    const newHeight = viewportHeight / 898 * 20;

    setCircleSize({ width: newWidth, height: newHeight })
  }

  // prevent too frequent update on windows resize
  const debounce = (func, delay) => {
    let debounceTimer;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  }

  useEffect(() => {
    rescaleToFitScreen();
  }, [])

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    // Handler for the animationend event
    const handleAnimationEnd = () => {
      if (onAnimationEnd) onAnimationEnd();
    };

    // Add event listener
    circle.addEventListener('animationend', handleAnimationEnd);

    // Cleanup
    return () => circle.removeEventListener('animationend', handleAnimationEnd);
  }, [onAnimationEnd]);

  
  // update bg color
  useEffect(() => {
    if (bgRef.current) { // Check if the ref is attached to an element
        bgRef.current.style.backgroundColor = bgColor;
        console.log(bgColor)
    }
  }, [bgColor])


  // Inline styles for the circle and container
  const styles = {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: bgColor, // Use the bgColor prop for background color
      zIndex: -1, // Stay behind other content
    },
    circle: {
      width: `${circleSize.width}px`,
      height: `${circleSize.height}px`,
      borderRadius: '50%',
      backgroundColor: newbgColor, // Use the bgColor prop for background color
      transform: 'scale(0)',
      animation: animate ? 'expand 2s forwards' : 'none',
    }
  };

  window.addEventListener('resize', debounce(rescaleToFitScreen, 250));

  return (
    <div style={styles.container} ref={bgRef}>
      {showTransation && <div style={styles.circle} ref={circleRef}></div>}
    </div>
  );
};

export default BackGround;
