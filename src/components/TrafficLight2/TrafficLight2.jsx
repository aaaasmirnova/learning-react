import { useEffect, useState } from "react";
import "./styles.css";
export const TrafficLight2 = ({ layout }) => {
  const config = {
    red: {
      backgroundColor: "red",
      duration: 4000,
      next: "green",
    },
    yellow: {
      backgroundColor: "yellow",
      duration: 500,
      next: "red",
    },
    green: {
      backgroundColor: "green",
      duration: 3000,
      next: "yellow",
    },
  };

  const [activeColor, setActiveColor] = useState(config.red.backgroundColor);
  const nextColor = config[activeColor].next;
  const duration = config[activeColor].duration;

  useEffect(() => {
    let interval;
    interval = setTimeout(() => setActiveColor(nextColor), duration);
    return () => clearInterval(interval);
  }, [activeColor]);

  return (
    <div className="traffic-light-wrapper">
      <div
        className={`traffic-light ${
          layout === "horizontal"
            ? "traffic-light-horizontal"
            : "traffic-light-vertical"
        }`}
      >
        {/* <div className="traffic-light-wrapper"> */}
        {Object.entries(config).map((elem) => (
          <div
            className={`light ${activeColor === elem[0] ? `${elem[0]}` : ""}`}
          ></div>
        ))}
        {/* <div className={`light ${activeColor===}`}></div> */}
        {/* <div className="light"></div>
      <div className="light"></div> */}
      </div>
    </div>
  );
};
