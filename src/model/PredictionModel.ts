import { ImageInterface } from './../interface/imageInterface';
import * as tf from "@tensorflow/tfjs";
import { loadLayersModel } from "@tensorflow/tfjs-layers";
import cv, { Mat, Rect } from "opencv-ts";

export async function loadModel() {
    // const model = await loadLayersModel(window.origin + "/model_js/model.json");
    console.log("loading model...");
    const model = await loadLayersModel("model_js/model.json");
    console.log('model is loaded')
    return model
}



export async function PredictionModel(images: ImageInterface[]) {
  const model = await loadModel()
  const imageList = []

  images.forEach((image, i) => {
    const imageUrl = image.url
    const imageElement:HTMLImageElement|null = document.getElementById(`glaucomaImage${i}`) as HTMLImageElement
    console.log(imageElement)
    const _imagefile = new Image
    console.log('here')
    _imagefile.onload = async () => {
      console.log('here3')
      if(imageElement && imageElement.src){
      //@ts-ignore
      // imageElement.src = this.src
      const imageFile = cv.imread(imageElement);  
      const dst: Mat = new cv.Mat(imageFile.cols, imageFile.rows, cv.CV_8UC4);
      cv.cvtColor(imageFile, dst, cv.COLOR_BGR2RGB);
      cv.resize(dst, dst, new cv.Size(224, 224), 0, 0, cv.INTER_AREA);
      cv.normalize(dst, dst, 0, 255, cv.NORM_MINMAX);
      console.log('here2')
      //console.log(dst.rows, dst.cols)
      const input = tf.tensor(dst.data, [1,dst.rows, dst.cols, 3])
      console.log(input)
      const prediction = model.predict(input) as tf.Tensor
      console.log('prediction')
      console.log(prediction)
      const data = await prediction.data();
      console.log('data')
      console.log(data)
      console.log(data[0],data[1])
      }
    }
    _imagefile.src = imageElement.src

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
