import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { loadLayersModel } from "@tensorflow/tfjs-layers";
import Image from "../interface/imageInterface";

async function loadModel() {
  const model = await loadLayersModel("modelDraft1.h5");
  return model;
}

const PredictionModel = (images: Image) => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [outputValue, setOutputValue] = useState<number | null>(null);
  const [model, setModel] = useState<tf.LayersModel | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseFloat(event.target.value));
  };

  const handleButtonClick = async () => {
    if (!model) {
      setModel(await loadModel());
    }
    const prediction = model.predict(
      tf.tensor2d([[inputValue]])
    ) as tf.Tensor<tf.Rank.R1>;
    setOutputValue(prediction.arraySync()[0]);
  };

  return (
    <div>
      <label htmlFor="input">Enter a number:</label>
      <input type="number" id="input" onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Predict</button>
      {outputValue && <p>The predicted value is: {outputValue}</p>}
    </div>
  );
};

export default PredictionModel;
