import React, { useState } from 'react';

function Predict() {
  const [inputValues, setInputValues] = useState({
    X: '',
    Y: '',
    month: '',
    day: '',
    FFMC: '',
    DMC: '',
    DC: '',
    ISI: '',
    temp: '',
    RH: '',
    wind: '',
    rain: '',
  });
  const [prediction, setPrediction] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues(prevValues => {
      const updatedValues = { ...prevValues, [name]: value };
      console.log('Updated Input Values:', updatedValues); // Log the updated input values
      return updatedValues;
    });
  };

  const handlePredict = async () => {
    console.log('Input Values for Prediction:', inputValues); // Log input values before prediction
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputValues),
      });
  
      if (response.ok) {
        const data = await response.json();
        setPrediction(data.prediction); // Set prediction value
        console.log('Prediction Response:', data.prediction); // Log the prediction response
      } else {
        console.error('Prediction failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching the prediction:', error);
    }
  };

  return (
    <div className="App">
      <h1>Forest Fire Prediction</h1>
      <form>
        <div>
          <label>X Coordinate: </label>
          <input type="number" name="X" value={inputValues.X} onChange={handleChange} />
        </div>
        <div>
          <label>Y Coordinate: </label>
          <input type="number" name="Y" value={inputValues.Y} onChange={handleChange} />
        </div>
        <div>
          <label>Month: </label>
          <select name="month" value={inputValues.month} onChange={handleChange}>
          <option value="">Select Month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        <div>
          <label>Day: </label>
          <select name="day" value={inputValues.day} onChange={handleChange}>
            <option value="">Select Day</option>
            <option value="mon">Monday</option>
            <option value="tue">Tuesday</option>
            <option value="wed">Wednesday</option>
            <option value="thu">Thursday</option>
            <option value="fri">Friday</option>
            <option value="sat">Saturday</option>
            <option value="sun">Sunday</option>
          </select>
        </div>
        <div>
          <label>FFMC: </label>
          <input type="number" name="FFMC" value={inputValues.FFMC} onChange={handleChange} />
        </div>
        <div>
          <label>DMC: </label>
          <input type="number" name="DMC" value={inputValues.DMC} onChange={handleChange} />
        </div>
        <div>
          <label>DC: </label>
          <input type="number" name="DC" value={inputValues.DC} onChange={handleChange} />
        </div>
        <div>
          <label>ISI: </label>
          <input type="number" name="ISI" value={inputValues.ISI} onChange={handleChange} />
        </div>
        <div>
          <label>Temperature: </label>
          <input type="number" name="temp" value={inputValues.temp} onChange={handleChange} />
        </div>
        <div>
          <label>Relative Humidity: </label>
          <input type="number" name="RH" value={inputValues.RH} onChange={handleChange} />
        </div>
        <div>
          <label>Wind Speed: </label>
          <input type="number" name="wind" value={inputValues.wind} onChange={handleChange} />
        </div>
        <div>
          <label>Rainfall: </label>
          <input type="number" name="rain" value={inputValues.rain} onChange={handleChange} />
        </div>
        <button type="button" onClick={handlePredict}>Predict</button>
      </form>
      {prediction && (
        <div>
          <h2>Predicted Burn Area: {prediction}</h2>
        </div>
      )}
    </div>
  );
}

export default Predict;
