import { ImageInterface } from "./../interface/imageInterface";
import * as tf from "@tensorflow/tfjs";
import { loadLayersModel } from "@tensorflow/tfjs-layers";
import cv, { Mat, Rect } from "opencv-ts";

let imageList: tf.Tensor<tf.Rank>[] = [];

export async function loadModel() {
  // const model = await loadLayersModel(window.origin + "/model_js/model.json");
  console.log("loading model...");
  const model = await loadLayersModel("model_js/model.json");
  console.log("model is loaded");
  return model;
}

async function getPrediction() {
  console.log("get prediction");
  console.log("All done!");
  const model = await loadModel();
  console.log(imageList);
  const predictionList = model.predict(imageList);
  console.log(predictionList);
}

export async function PredictionModel(images: ImageInterface[]) {
  const model = await loadModel();
  imageList = [];

  var bar = new Promise((resolve, reject) => {
    images.forEach((image, i) => {
      const imageUrl = image.url;
      const imageElement: HTMLImageElement | null = document.getElementById(
        `glaucomaImage${i}`
      ) as HTMLImageElement;
      const _imagefile = new Image();
      console.log("here");
      _imagefile.onload = async () => {
        console.log("here3");
        console.log(model);
        console.log(model.summary());
        if (imageElement && imageElement.src) {
          //@ts-ignore
          // imageElement.src = this.src
          const imageFile = cv.imread(imageElement);
          const dst: Mat = new cv.Mat(
            imageFile.cols,
            imageFile.rows,
            cv.CV_8UC4
          );
          cv.cvtColor(imageFile, dst, cv.COLOR_BGR2RGB);
          cv.resize(dst, dst, new cv.Size(224, 224), 0, 0, cv.INTER_AREA);
          cv.normalize(dst, dst, 0, 255, cv.NORM_MINMAX);

          console.log("here2");
          //console.log(dst.rows, dst.cols)
          const input = tf.tensor(
            dst.data,
            [1, dst.rows, dst.cols, 3],
            "float32"
          );
          //const input = tf.tensor(dst.data, [dst.rows, dst.cols, 3]);
          // console.log("line45");
          // imageList.push(input);
          //const imageTensor = tf.reshape()
          console.log(input);
          const prediction = model.predict(input) as tf.Tensor;
          console.log("prediction");
          console.log(prediction);
          const data = await prediction.data();
          console.log("data");
          console.log(data);
          console.log(data[0], data[1]);
          const result = [data[0], data[1]];
          //console.log(model.output.shape); // e.g. [null, 10]
          //console.log(model.output.dtype); // e.g. "float32"
        }
      };
      _imagefile.src = imageElement.src;
      // if (i === images.length - 1) {
      //   getPrediction();
      // }
    });
  });
  // bar.then(() => {
  //   console.log("All done!");
  //   console.log(imageList);
  //   const predictionList = model.predict(imageList);
  //   console.log(predictionList);
  // });
}
