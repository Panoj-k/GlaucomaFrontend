import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { loadLayersModel } from "@tensorflow/tfjs-layers";
import { ImageInterface } from "../interface/imageInterface";
//import cv from "opencv.js";
const cv = require("opencv.js");

const PredictionModel = (images: ImageInterface[]) => {
  async function loadModel() {
    console.log("loading model...");
    const model = await loadLayersModel(window.origin + "/model_js/model.json");
    //const model = await loadLayersModel("model_js/model.json");
    //const model = await loadLayersModel("file:model_js/model.json");
    return model;
  }
  const [imageList, setImageList] = useState<string[]>([]);

  const model = loadModel();
  const inputList = [1, 2];

  console.log("prediction model is called");

  const resizeImage = (imageUrl: string) => {
    const image = new Image();
    console.log("resizing image is called");
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
    return ctx;
  };

  //loop
  for (let i = 0; i < images.length; i++) {
    console.log(images[i].name);
    const image = resizeImage(images[i].url);
    // model.then((model) => {
    //   let result = model.predict(image);
    // });
    //let result = model.predict(inputTensor)
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

  return { inputList };
};

export default PredictionModel;
