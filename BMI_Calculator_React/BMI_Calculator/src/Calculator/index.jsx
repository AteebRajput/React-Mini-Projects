import { useState } from "react";
import "./index.css";

function Calculator() {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmi, setBmi] = useState(0);

  const bmiCalculator = (e) => {
    e.preventDefault(); // Prevents form from submitting and reloading the page
    const heightInMeters = height / 100; // Convert height from cm to meters
    const calculatedBmi = weight / (heightInMeters * heightInMeters); // Correct BMI formula
    setBmi(calculatedBmi.toFixed(2)); // Set BMI and round to 2 decimal places
    console.log(calculatedBmi.toFixed(2)); // Logs the BMI value
    setHeight(0);
    setWeight(0);
  };

  const renderBMICategory = () => {
    if (bmi < 18.5) {
        return <p>You are underweight.</p>;
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return <p>You have a normal weight.</p>;
    } else if (bmi >= 25 && bmi < 29.9) {
        return <p>You are overweight.</p>;
    } else if (bmi >= 30 && bmi < 34.9) {
        return <p>You are in Obesity Class I (Moderate).</p>;
    } else if (bmi >= 35 && bmi < 39.9) {
        return <p>You are in Obesity Class II (Severe).</p>;
    } else if (bmi >= 40) {
        return <p>You are in Obesity Class III (Very Severe).</p>;
    } else {
        return null; // If no valid BMI, return nothing
    }
};


  return (
    <>
      <div className="bmi">
        <h1>BMI Calculator</h1>
        <form onSubmit={bmiCalculator} className="form">
          <div className="height">
            <label htmlFor="Height">
              Height (cm)<sup>*</sup>
            </label>
            <input
              id="Height"
              type="number"
              name="height"
              className="input"
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="height">
            <label htmlFor="Height">
              Weight (kg)<sup>*</sup>
            </label>
            <input
              id="Weight"
              type="number"
              name="weight"
              className="input"
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <button type="submit">
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>
            <span className="text">Submit</span>
          </button>
        </form>
        <div className="result">
          {bmi > 0 && <p>Your BMI is: {bmi}</p>}{" "}
          <div className="category">
          {
            renderBMICategory()
          }
          </div>
        </div>
      </div>
    </>
  );
}

export default Calculator;
