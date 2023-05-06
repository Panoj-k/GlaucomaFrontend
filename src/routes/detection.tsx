import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef,
} from "react";
import PageContainer from "../components/containers/PageContainer";
import { useDropzone } from "react-dropzone";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Box, Container, Button } from "@mui/material";
import { color } from "@mui/system";
import { useTranslation } from "react-i18next";
import { Margin } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { ImageContext } from "../context/imageContext";
import { ImageInterface } from "../interface/imageInterface";
import { PredictionModel } from "../model/PredictionModel";
import { TIFF } from "tiff.js";

const Detection = () => {
  const [step, setStep] = useState(0);
  const [isImageEmpty, setIsImageEmpty] = useState(false);
  const [clicked, setClicked] = useState(false);

  const steps = ["Upload", "Review", "Result"];
  const { t } = useTranslation();

  //---picture drop
  const { images, setImages } = useContext(ImageContext);

  async function convertTiffToPng(tiffFile: File): Promise<Blob> {
    const tiffData = await tiffFile.arrayBuffer();
    console.log(tiffData);
    var int8view = new Uint8Array(tiffData);
    console.log(int8view);
    let blob1 = new Blob([new Uint8Array(int8view)], { type: "image/png" });

    // const tiffImage = TIFF.decode(tiffData);

    // const canvas = document.createElement("canvas");
    // canvas.width = tiffImage.width;
    // canvas.height = tiffImage.height;

    // const ctx = canvas.getContext("2d");
    // if (!ctx) {
    //   throw new Error("Failed to get 2D context for canvas");
    // }

    // const imageData = ctx.createImageData(tiffImage.width, tiffImage.height);
    // imageData.data.set(tiffImage.getImageData());

    // ctx.putImageData(imageData, 0, 0);

    // const pngDataUrl = canvas.toDataURL("image/png");
    // const pngData = atob(pngDataUrl.split(",")[1]);

    // const pngArray = new Uint8Array(pngData.length);
    // for (let i = 0; i < pngData.length; i++) {
    //   pngArray[i] = pngData.charCodeAt(i);
    // }

    return new Blob([int8view], { type: "image/png" });
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const readers = acceptedFiles.map((file) => {
        const reader = new FileReader();
        if (file.type === "image/tiff") {
          return new Promise<ImageInterface>((resolve, reject) => {
            reader.onload = async () => {
              const pngBlob = await convertTiffToPng(file);
              console.log(pngBlob);
              const pngUrl = URL.createObjectURL(pngBlob);
              console.log(pngUrl);
              const image = {
                url: URL.createObjectURL(pngBlob),
                name: file.name.replace(/\.[^/.]+$/, "") + ".png",
                result: [0, 0],
              };
              resolve(image);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
          });
        } else {
          return new Promise<ImageInterface>((resolve, reject) => {
            reader.onload = () => {
              const image = {
                url: reader.result as string,
                name: file.name,
                result: [0, 0],
              };
              resolve(image);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        }
      });

      Promise.all(readers)
        .then((newImages) => {
          setImages([...images, ...newImages]);
          setStep(1);
        })
        .catch((error) => console.error(error));
    },
    [images]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleImageNameChange = (index: number, newName: string) => {
    const newImages = [...images];
    newImages[index].name = newName;
    setImages(newImages);
  };

  const handleImageDelete = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  useEffect(() => {
    if (images.length === 0 && step === 1) setIsImageEmpty(true);
    else setIsImageEmpty(false);
  }, [images]);

  const history = useHistory();

  // const getPrediction = () => {
  //   console.log("getting prediction...");
  //   const result = PredictionModel(images);
  //   return result;
  // };
  const mapResult = (images: ImageInterface[], results: any) => {
    images.forEach((image, i) => {
      console.log("mapping result");
      console.log(image.result);
      image.result = results[i];
      console.log(image.result);
    });
  };
  const handleCheck = async () => {
    if (!clicked) {
      setClicked(true);
    }
    console.log("getting prediction...");
    const results = await PredictionModel(images);
    console.log("results from function is: ");
    console.log(results);
    mapResult(images, results);
    history.push("/result");
    // send images to check
  };

  return (
    <Container>
      <h2>{t("detection.Name")}</h2>
      <Box sx={{ display: "grid", placeItems: "center" }}>
        <Stepper
          activeStep={step}
          alternativeLabel
          sx={{ width: ["200px", "400px", "600px"] }}
        >
          <Step key="Upload">
            <StepLabel>{t("detection.Step0")}</StepLabel>
          </Step>
          <Step key="Review">
            <StepLabel>{t("detection.Step1")}</StepLabel>
          </Step>
          <Step key="Result">
            <StepLabel>{t("detection.Step2")}</StepLabel>
          </Step>
        </Stepper>
      </Box>
      <div>
        {step === 0 && (
          <h6>
            {t("detection.Upload Step")}
            <br />
            {t("detection.Upload Instruction")}
            <br />
            {t("detection.Upload Instruction2")}
          </h6>
        )}
        {step === 1 && (
          <h6>
            {t("detection.Review Step")}
            <br />
            {t("detection.Review Instruction")}
            <br />
            {t("detection.Review Instruction2")}
            <br />
            {t("detection.Review Instruction3")}
          </h6>
        )}
      </div>
      <Box>
        <Box
          textAlign={"center"}
          sx={{
            minWidth: 300,
          }}
        >
          {step === 0 && (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>{t("detection.Drop Zone Drag")}</p>
              ) : (
                <p>
                  {t("detection.Drop Zone")}
                  <br />
                  <br />
                  <Button variant="contained" sx={{ alignSelf: "center" }}>
                    {t("detection.Select Picture Button")}
                  </Button>
                </p>
              )}
            </div>
          )}
          {step === 1 && (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Button
                variant="contained"
                sx={{ alignSelf: "center", marginBottom: 2 }}
              >
                {t("detection.Add Picture Button")}
              </Button>
            </div>
          )}
        </Box>
        <Box
          textAlign={"center"}
          sx={{
            bgcolor: "background.paper",
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            minWidth: 300,
            marginBottom: 2,
          }}
        >
          {images.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                overflowY: "scroll",
                maxHeight: "300px",
              }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  style={{ width: "30%", padding: 5, position: "relative" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget.lastChild as HTMLElement).style.display =
                      "block")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget.lastChild as HTMLElement).style.display =
                      "none")
                  }
                >
                  <img
                    id={`glaucomaImage${index}`}
                    src={image.url}
                    alt={`Uploaded picture ${index + 1}`}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <input
                    type="text"
                    value={image.name}
                    onChange={(e) =>
                      handleImageNameChange(index, e.target.value)
                    }
                  />
                  <button
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      display: "none",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      cursor: "pointer",
                    }}
                    onClick={() => handleImageDelete(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
        </Box>
      </Box>
      <Box textAlign={"center"} sx={{ marginBottom: 2 }}>
        {step > 0 && (
          <Button
            variant="contained"
            disabled={isImageEmpty || clicked}
            onClick={handleCheck}
          >
            {t("detection.Check Button")}
          </Button>
        )}

        <p>{isImageEmpty && <h6>{t("detection.Error No Picture")}</h6>}</p>
      </Box>
    </Container>
  );
};

export default Detection;
