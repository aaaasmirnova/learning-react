import { useState } from "react";
import "./styles.css";

export const BodyMassIndex = () => {
  const [inputHeightValue, setInputHeightValue] = useState(0);
  const [inputWeightValue, setInputWeightValue] = useState(0);
  const [result, setResult] = useState(null);

  const info = [
    { name: "Underweight", color: "blue", range: "Below 18.5" },
    { name: "Healthy", color: "green", range: "18.5 - 24.9" },
    { name: "Overweight", color: "orange", range: "25 - 29.9" },
    { name: "Obese", color: "red", range: "30 and Above" },
  ];

  const changeHeight = (event) => {
    setInputHeightValue(event.target.value);
  };

  const changeWeight = (event) => {
    setInputWeightValue(event.target.value);
  };

  const clearFields = () => {
    setInputHeightValue(0);
    setInputWeightValue(0);
    setResult(null);
  };

  const calculateBMI = () => {
    let newResult;
    if (inputHeightValue) {
      newResult = inputWeightValue / Math.pow(inputHeightValue / 100, 2);
    }

    setResult(newResult.toFixed(1));
  };

  const getResultInfo = () => {
    if (result < 18.5) {
      return { interpretation: "Underweight", color: "bluecolor" };
    }
    if (result > 18.5 && result < 24.9) {
      return { interpretation: "Healthy", color: "greencolor" };
    }
    if (result > 25 && result < 29.9) {
      return { interpretation: "Overweight", color: "yellowcolor" };
    }
    if (result > 30) {
      return { interpretation: "Obese", color: "redcolor" };
    }
  };

  const resultInfo = getResultInfo();

  return (
    <div className="form-wrapper">
      <header className="main-header">
        <img
          width="30"
          height="30"
          src="https://play-lh.googleusercontent.com/mmU5Lm1DcigPHQa3DtNPrNFBdFeMgiXZwb3rM1xwcqi_169fK8DBzKo3KUZPPoWf2Lc"
        ></img>
        <h1 className="main-header-title">BMI Calculator for Adults</h1>
      </header>
      <div className="inputs-wrapper">
        <div className="input-wrapper">
          <input
            className="parameter"
            type="number"
            id="height"
            value={inputHeightValue}
            onChange={changeHeight}
          ></input>
          <label className="label" for="height">
            Height(cm):
          </label>
        </div>

        <div className="input-wrapper">
          <input
            className="parameter"
            type="number"
            id="weight"
            value={inputWeightValue}
            onChange={changeWeight}
          ></input>
          <label className="" for="weight">
            Weight(kg):
          </label>
        </div>
      </div>
      <div className="buttons-calculate-wrapper">
        <button onClick={clearFields}>Reset</button>
        <button onClick={calculateBMI}>Calculate</button>
      </div>
      <div className="results-wrapper">
        <p className="result-value">{result}</p>
        {result && (
          <p className="result-name">
            You are{" "}
            <span className={resultInfo.color}>
              {resultInfo.interpretation}
            </span>
            !
          </p>
        )}
      </div>
      <dl className="result-interpretation">
        {info.map((elem) => (
          <div
            className="result-interpretation-info"
            style={{ borderTop: `2px solid ${elem.color}` }}
          >
            <dt>{elem.name}</dt>
            <dd>{elem.range}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
