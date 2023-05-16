import { ImageInterface } from "./../interface/imageInterface";
import * as tf from "@tensorflow/tfjs";
import { loadLayersModel } from "@tensorflow/tfjs-layers";
import cv, { Mat } from "opencv-ts";

export async function loadModel() {
  // const model = await loadLayersModel(window.origin + "/model_js/model.json");
  // const model = await loadLayersModel("model_js/model.json");
  // const model = await loadLayersModel("modelVGG_js/model.json");
  // ------
  // const model = await loadLayersModel("modelDenseNet_js/model.json");
  // const model = await loadLayersModel("predictionModel_DenseM3D640E150_js/model.json");
  // const model = await loadLayersModel("predictionModel_DenseE100_js/model.json");
  // ------
  const model = await loadLayersModel("model_VGGM5_js/model.json");
  // const model = await loadLayersModel("predictionModel_VGGM5D640E150_js/model.json");
  // const model = await loadLayersModel("predictionModel_VGGE100_js/model.json");
  // ------
  // const model = await loadLayersModel("model_InceptionM6_js/model.json");
  // const model = await loadLayersModel("predictionModel_InceptionM6D640E200_js/model.json"); //Need Check Different output 2 times.
  // const model = await loadLayersModel("predictionModel_InceptionE100_js/model.json");
  // const model = await loadLayersModel("predictionModel_InceptionM6D640E100_js/model.json");
  console.log("prediction model is successfully loaded");
  return model;
}

export async function PredictionModel(images: ImageInterface[]) {
  const model = await loadModel();
  const promises = images.map((image, i) => {
    return new Promise(async (resolve, reject) => {
      const imageUrl = image.url;
      const imageElement: HTMLImageElement | null = document.getElementById(
        `glaucomaImage${i}`
      ) as HTMLImageElement;
      const _imagefile = new Image();
      _imagefile.onload = async () => {
        if (imageElement && imageElement.src) {
          const imageFile = cv.imread(imageElement);
          //Image normalization
          let dst: Mat = new cv.Mat(imageFile.cols, imageFile.rows, cv.CV_32F);
          cv.cvtColor(imageFile, dst, cv.COLOR_RGBA2RGB);
          cv.resize(dst, dst, new cv.Size(224, 224), 0, 0, cv.INTER_AREA);
          dst.convertTo(dst, cv.CV_32F, 1 / 255.0);

          const input = tf.tensor(
            dst.data32F,
            [1, dst.rows, dst.cols, 3],
            "float32"
          );
          const prediction = model.predict(input) as tf.Tensor;
          const data = await prediction.data();
          const probNormal: number = parseFloat((data[0] * 100).toFixed(2));
          const probGlaucoma: number = parseFloat((data[1] * 100).toFixed(2));
          resolve([probNormal, probGlaucoma]);
        }
      };
      _imagefile.src = imageElement.src;
    });
  });

  return await Promise.all(promises);
}
