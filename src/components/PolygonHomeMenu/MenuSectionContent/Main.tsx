import React from "react";
import "./Main.css"

const MainSection = () => {
  return (
    <div className="container">
      <div className="left-buff"/>

      {/* Left side */}
      <div className="left-section">
        <div className="title">
          <div className="intro-text">
            <div>Hi, My</div>
            <div>name is <span className="name"> Henry </span></div>
          </div>
        </div>
        <div className="bottom-text">I'm a software Developer !!!</div>
      </div>



      {/* Right side */}
      <div className="right">
        <div className="profile">
          Image
        </div>
      </div>
      <div className="right-buff"/>
    </div>
  );
};

export default MainSection;
