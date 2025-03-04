import { useState } from "react";
import { pictures } from "./data";
import "./styles.css";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

export const SliderPictures = ({ isLoop }) => {
  const [activePictureIndex, setActivePictureIndex] = useState(0);

  const showPreviousPicture = () => {
    let previousPictureIndex = activePictureIndex;
    if (previousPictureIndex === 0) {
      if (isLoop) {
        previousPictureIndex = pictures.length - 1;
      } else {
        previousPictureIndex = 0;
      }
    } else {
      previousPictureIndex--;
    }
    setActivePictureIndex(previousPictureIndex);
  };

  const showNextPicture = () => {
    let nextPictureIndex = activePictureIndex;

    if (nextPictureIndex === pictures.length - 1) {
      if (isLoop) {
        nextPictureIndex = 0;
      } else {
        nextPictureIndex === pictures.length - 1;
      }
    } else {
      nextPictureIndex++;
    }

    setActivePictureIndex(nextPictureIndex);
  };

  return (
    <div className="slider">
      <img src={pictures[activePictureIndex]} width="500" height="300"></img>
      <div className="slider-buttons-wrapper">
        <button
          className="slider-button previous-slider-button"
          onClick={showPreviousPicture}
          disabled={activePictureIndex === 0 ? true : ""}
        >
          <MdArrowBackIos />
        </button>
        <div className="slider-dots">
          {pictures.map((_, index) => (
            <button
              className={`slider-dot ${
                activePictureIndex === index ? "active-slider-dot" : ""
              }`}
              onClick={() => setActivePictureIndex(index)}
            ></button>
          ))}
        </div>

        <button
          className="slider-button next-slider-button"
          onClick={showNextPicture}
          disabled={activePictureIndex === pictures.length - 1 ? true : ""}
        >
          <MdArrowForwardIos />
        </button>
      </div>
    </div>
  );
};
