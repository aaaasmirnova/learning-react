import { useState } from "react";
import { steps } from "./data";
import { IoCheckmarkCircle } from "react-icons/io5";
import "./styles.css";

export const Form = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [info, setInfo] = useState({});
  const [doneButtonActive, setDoneButtonActive] = useState(false);
  const showNextForm = (e) => {
    e.preventDefault();
    const newStep = activeStep + 1;
    setActiveStep(newStep);
    const newInfo = { ...info };
    for (let elem of steps[newStep]) {
      if (!Object.keys(info).includes(elem)) {
        newInfo[elem] = "";
      }
    }
    setInfo(newInfo);
  };

  const showPreviousForm = (e) => {
    // e.preventDefault();
    setActiveStep(activeStep - 1);
  };

  const changeInfo = (event, elem) => {
    setInfo({ ...info, [elem]: event.target.value.trim() });
  };

  const completeForm = () => {
    setDoneButtonActive(true);

    console.log(info);
  };

  if (doneButtonActive) {
    return (
      <div>
        <p>
          {" "}
          <IoCheckmarkCircle color="violet" />
          You have successfully completed the process.
        </p>
      </div>
    );
  }

  return (
    <div className="form-wrapper">
      <div className="form-dots-wrapper">
        {steps.map((elem, index) => (
          <div className={`form-symbols-wrapper`}>
            <div
              key={index}
              className={`form-dot ${
                elem.every((item) => info[item]) ? "active-form-dot" : ""
              }`}
            >
              {index + 1}
            </div>
            <div
              className={`${index !== steps.length - 1 ? "form-line" : ""} ${
                elem.every((item) => info[item]) ? "active-form-dot" : ""
              }`}
            ></div>
          </div>
        ))}
      </div>
      <form>
        {steps[activeStep].map((elem) => (
          <div className="form-input-wrapper">
            <label for={elem}>{elem}</label>
            <input
              value={info[elem]}
              onChange={(event) => changeInfo(event, elem)}
              id={elem}
            />
          </div>
        ))}
        <div className="form-buttons-wrapper">
          {activeStep > 0 && (
            <button
              type="button"
              className="form-button"
              onClick={showPreviousForm}
            >
              Back
            </button>
          )}
          {activeStep === steps.length - 1 ? (
            <button
              className="form-button form-done-button"
              onClick={completeForm}
            >
              Done
            </button>
          ) : (
            <button
              className="form-next-button form-button"
              type="submit"
              onClick={showNextForm}
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
