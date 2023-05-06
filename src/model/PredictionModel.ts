import { ImageInterface } from "./../interface/imageInterface";
import * as tf from "@tensorflow/tfjs";
import { loadLayersModel } from "@tensorflow/tfjs-layers";
import cv, { Mat, Rect } from "opencv-ts";

let imageList: tf.Tensor<tf.Rank>[] = [];

export async function loadModel() {
  // const model = await loadLayersModel(window.origin + "/model_js/model.json");
  console.log("loading model...");
  // const model = await loadLayersModel("model_js/model.json");
  // const model = await loadLayersModel("modelVGG_js/model.json");
  // ------
  // const model = await loadLayersModel("modelDenseNet_js/model.json");
  // const model = await loadLayersModel("modelDenseM3D640E150_js/model.json");
  // const model = await loadLayersModel("modelDenseE100_js/model.json");
  // ------
  // const model = await loadLayersModel("model_VGGM5_js/model.json");
  const model = await loadLayersModel("model_VGGM5D640E150_js/model.json");
  // const model = await loadLayersModel("model_VGGE100_js/model.json");
  // ------
  // const model = await loadLayersModel("model_InceptionM6_js/model.json");
  // const model = await loadLayersModel("model_InceptionM6D640E200_js/model.json");
  // const model = await loadLayersModel("model_InceptionE100_js/model.json");
  console.log("model Inception is loaded");
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

// export async function PredictionModel(images: ImageInterface[]) {
//   const model = await loadModel();
//   imageList = [];
//   const results: number[][] = [];

//   // This one
//   var bar = new Promise((resolve, reject) => {
//     images.forEach((image, i) => {
//       const imageUrl = image.url;
//       const imageElement: HTMLImageElement | null = document.getElementById(
//         `glaucomaImage${i}`
//       ) as HTMLImageElement;
//       const _imagefile = new Image();
//       console.log("here");
//       _imagefile.onload = async () => {
//         console.log("here3");
//         //console.log(model);
//         //console.log(model.summary());
//         if (imageElement && imageElement.src) {
//           //@ts-ignore
//           // imageElement.src = this.src
//           const imageFile = cv.imread(imageElement);
//           const dst: Mat = new cv.Mat(
//             imageFile.cols,
//             imageFile.rows,
//             cv.CV_8UC4
//           );
//           cv.cvtColor(imageFile, dst, cv.COLOR_BGR2RGB);
//           cv.resize(dst, dst, new cv.Size(224, 224), 0, 0, cv.INTER_AREA);
//           cv.normalize(dst, dst, 0, 255, cv.NORM_MINMAX);

//           console.log("here2");
//           //console.log(dst.rows, dst.cols)
//           const input = tf.tensor(
//             dst.data,
//             [1, dst.rows, dst.cols, 3],
//             "float32"
//           );
//           //const input = tf.tensor(dst.data, [dst.rows, dst.cols, 3]);
//           // console.log("line45");
//           // imageList.push(input);
//           //const imageTensor = tf.reshape()
//           console.log(input);
//           const prediction = model.predict(input) as tf.Tensor;
//           console.log("prediction");
//           console.log(prediction);
//           const data = await prediction.data();
//           console.log("data");
//           console.log(data);
//           console.log(data[0], data[1]);
//           results.push([data[0], data[1]]);
//           //console.log(model.output.shape); // e.g. [null, 10]
//           //console.log(model.output.dtype); // e.g. "float32"
//         }
//       };
//       _imagefile.src = imageElement.src;
//       // if (i === images.length - 1) {
//       //   getPrediction();
//       // }
//     });
//   });
//   return results;
//   // bar.then(() => {
//   //   console.log("All done!");
//   //   console.log(imageList);
//   //   const predictionList = model.predict(imageList);
//   //   console.log(predictionList);
//   // });
// }

export async function PredictionModel(images: ImageInterface[]) {
  const model = await loadModel();
  imageList = [];
  const results: number[][] = [];

  // This one
  const promises = images.map((image, i) => {
    return new Promise(async (resolve, reject) => {
      const imageUrl = image.url;
      const imageElement: HTMLImageElement | null = document.getElementById(
        `glaucomaImage${i}`
      ) as HTMLImageElement;
      const _imagefile = new Image();
      _imagefile.onload = async () => {
        // console.log("here3");
        if (imageElement && imageElement.src) {
          const imageFile = cv.imread(imageElement);
          let dst: Mat = new cv.Mat(imageFile.cols, imageFile.rows, cv.CV_32F);
          cv.cvtColor(imageFile, dst, cv.COLOR_RGBA2RGB);
          // console.log(imageFile.data32F);
          // console.log(dst.data32F);
          cv.resize(dst, dst, new cv.Size(224, 224), 0, 0, cv.INTER_AREA);
          console.log(dst.data32F);
          dst.convertTo(dst, cv.CV_32F, 1 / 255.0);
          //cv.normalize(dst, dst, 0, 255, cv.NORM_MINMAX);
          // console.log("image after cv normalized");
          // console.log(dst.data32F);

          // console.log("here2");
          const input = tf.tensor(
            dst.data32F,
            [1, dst.rows, dst.cols, 3],
            "float32"
          );
          // let input = tf.tensor(
          //   dst.data32F,
          //   [dst.rows, dst.cols, 3],
          //   "float32"
          // );
          // input = tf.expandDims(input, 0);
          const prediction = model.predict(input) as tf.Tensor;
          const data = await prediction.data();
          // console.log("data");
          // console.log(data);
          console.log(data[0], data[1]);
          const probNormal: number = parseFloat((data[0] * 100).toFixed(2));
          const probGlaucoma: number = parseFloat((data[1] * 100).toFixed(2));
          // console.log(probNormal, probGlaucoma);
          resolve([probNormal, probGlaucoma]);
        }
      };
      _imagefile.src = imageElement.src;
    });
  });

  return await Promise.all(promises);
}
