import React from "react";
import "../StarsBackground.css";
import bgStars from "@/assets/stars.png"

const StarsBackground = () => {
  return (
    <div className="star-bg">
        <div
      className="stars"
      style={{ backgroundImage: `url(${bgStars})` }}
    >
    </div>
      <div className="twinkling"></div>
    </div>
  );
};

export default StarsBackground;
