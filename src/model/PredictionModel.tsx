import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { loadLayersModel } from "@tensorflow/tfjs-layers";
import { ImageInterface } from "../interface/imageInterface";

async function loadModel() {
  const model = await loadLayersModel("modelDraft1.h5");
  return model;
}

const PredictionModel = (images: ImageInterface[]) => {
  const inputList = [1, 2];
  const [imageList, setImageList] = useState([]);

  const resizeImage = (imageUrl: string) => {
    const image = new Image();
    image.src = imageUrl;
    const canvas = document.createElement("canvas");
    const MAX_WIDTH = 224;
    const MAX_HEIGHT = 224;
    let width = image.width;
    let height = image.height;
    if (width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
    }

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (ctx) ctx.drawImage(image, 0, 0, width, height);
    return console.log("resizing image");
  };

  //loop
  for (let i = 0; i < images.length; i++) {
    //console.log(images[i].name);
    resizeImage(images[i].url);
    console.log(images[i].result);
  }
  // inputList =
  //   const [inputValue, setInputValue] = useState<number>(0);
  // const [outputValue, setOutputValue] = useState<number | null>(null);
  // const [model, setModel] = useState<tf.LayersModel | null>(null);

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(parseFloat(event.target.value));
  // };

  // const handleButtonClick = async () => {
  //   if (!model) {
  //     setModel(await loadModel());
  //   }
  //   const prediction = model.predict(
  //     tf.tensor2d([[inputValue]])
  //   ) as tf.Tensor<tf.Rank.R1>;
  //   setOutputValue(prediction.arraySync()[0]);
  // };

  return (
    // <div>
    //   <label htmlFor="input">Enter a number:</label>
    //   <input type="number" id="input" onChange={handleInputChange} />
    //   <button onClick={handleButtonClick}>Predict</button>
    //   {outputValue && <p>The predicted value is: {outputValue}</p>}
    // </div>
    { inputList }
  );
};

export default PredictionModel;
