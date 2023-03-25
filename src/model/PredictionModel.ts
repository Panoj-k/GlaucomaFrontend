import { ImageInterface } from './../interface/imageInterface';
// import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { loadLayersModel } from "@tensorflow/tfjs-layers";
// import { ImageInterface } from "../interface/imageInterface";
// //import * as cv from "opencv.js";
// // const cv = require("opencv.js");
import cv, { Mat, Rect } from "opencv-ts";
// import { LayersModel } from "@tensorflow/tfjs";

export async function loadModel() {
    // const model = await loadLayersModel(window.origin + "/model_js/model.json");
    console.log("loading model...");
    const model = await loadLayersModel("model_js/model.json");
    return model
}

export async function PredictionModel(images: ImageInterface[]) {
  const model = await loadModel()

  images.forEach((image, i) => {
    const imageUrl = image.url
    //console.log(imageUrl)
    const imageFile = cv.imread(imageUrl);
    const dst: Mat = new cv.Mat(imageFile.cols, imageFile.rows, cv.CV_8UC4);
    cv.cvtColor(imageFile, dst, cv.COLOR_BGR2RGB);
    cv.resize(imageFile, dst, new cv.Size(224, 224), 0, 0, cv.INTER_AREA);
    cv.normalize(imageFile, dst, 0, 255, cv.NORM_MINMAX);
    const tensor = tf.tensor(imageFile.data, [imageFile.rows, imageFile.cols, -1])
    const prediction = model.predict(tensor)
    console.log(prediction)
  })

  
  
}

// interface P {
//   images: ImageInterface[];
// }

// const PredictionModel = ({ images }: P) => {
//   // const PredictionModel = (images: ImageInterface[]) => {
//   // const [imageList, setImageList] = useState<string[]>([]);
//   const [model, setModel] = useState<LayersModel>();

//   async function loadModel() {
//     console.log("loading model...");
//     const model = await loadLayersModel(window.origin + "/model_js/model.json");
//     //const model = await loadLayersModel("model_js/model.json");
//     //const model = await loadLayersModel("file:model_js/model.json");
//     return model;
//   }

//   useEffect(() => {
//     async function fn() {
//       const _model = await loadModel();
//       setModel(_model);
//     }

//     fn();
//   }, []);

//   //const model = loadModel();
//   const inputList = [1, 2]; //delete this line

//   console.log("prediction model is called");

//   const resizeImage = (imageUrl: string) => {
//     console.log("resizing image is called");
//     const imageFile = cv.imread(imageUrl);
//     const dst: Mat = new cv.Mat(imageFile.cols, imageFile.rows, cv.CV_8UC4);
//     cv.cvtColor(imageFile, dst, cv.COLOR_BGR2RGB);
//     cv.resize(imageFile, dst, new cv.Size(224, 224), 0, 0, cv.INTER_AREA);
//     cv.normalize(imageFile, dst, 0, 255, cv.NORM_MINMAX);
//     return imageFile;
//   };

//   //loop
//   for (let i = 0; i < images.length; i++) {
//     console.log(images[i].name);
//     const imageFile = resizeImage(images[i].url);
//     console.log(imageFile);
//     // model.then((model) => {
//     //   let result = model.predict(image);
//     // });
//     //let result = model.predict(inputTensor)
//     //console.log(images[i].result);
//   }
//   // inputList =
//   //   const [inputValue, setInputValue] = useState<number>(0);
//   // const [outputValue, setOutputValue] = useState<number | null>(null);
//   // const [model, setModel] = useState<tf.LayersModel | null>(null);

//   // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   //   setInputValue(parseFloat(event.target.value));
//   // };

//   // const handleButtonClick = async () => {
//   //   if (!model) {
//   //     setModel(await loadModel());
//   //   }
//   //   const prediction = model.predict(
//   //     tf.tensor2d([[inputValue]])
//   //   ) as tf.Tensor<tf.Rank.R1>;
//   //   setOutputValue(prediction.arraySync()[0]);
//   // };

//   return <> </>;
// };

// export default PredictionModel;
