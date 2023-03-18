import React, { useState, useCallback, useEffect, useContext } from "react";
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

interface Image {
  url: string;
  name: string;
}

const Detection = () => {
  const [step, setStep] = useState(0);
  const [isImageEmpty, setIsImageEmpty] = useState(false);

  const steps = ["Upload", "Review", "Result"];
  const { t } = useTranslation();

  //---picture drop
  const { images, setImages } = useContext(ImageContext);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const readers = acceptedFiles.map((file) => {
        const reader = new FileReader();

        return new Promise<Image>((resolve, reject) => {
          reader.onload = () => {
            const image = {
              url: reader.result as string,
              name: file.name,
            };
            resolve(image);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      setStep(1);

      Promise.all(readers)
        .then((newImages) => setImages([...images, ...newImages]))
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
  const handleCheck = () => {
    setStep(2);
    history.push("/result");
    // send images to check
  };

  return (
    <Container>
      <h2>Detection tool</h2>
      <Box sx={{ display: "grid", placeItems: "center" }}>
        <Stepper
          activeStep={step}
          alternativeLabel
          sx={{ width: ["200px", "400px", "600px"] }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <div>
        {step === 0 && (
          <h6>
            Upload step:
            <br />
            Please drag and drop pictures in the box below or click select
            pictures button to add pictures.
            <br />
            Accepted File Types: .jpg, .png, .tif. Maximum picture at 20.
          </h6>
        )}
        {step === 1 && (
          <h6>
            Review step:
            <br />
            Please check the correctness of the pictures. You can edit the
            picture name in the box below each picture. Click the delete button
            on the top right of the picture to remove.
            <br />
            To add more picture click add picture button. Maximum picture at 20
            <br />
            Click check button to start detection
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
                <p>Drop the pictures here ...</p>
              ) : (
                <p>
                  Drag and drop pictures here, or click select pictures
                  <br />
                  <br />
                  <Button variant="contained" sx={{ alignSelf: "center" }}>
                    Select Pictures
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
                Add Pictures
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
            disabled={isImageEmpty}
            onClick={handleCheck}
          >
            Check
          </Button>
        )}

        <p>{isImageEmpty && <h6>Please upload picture to process </h6>}</p>
      </Box>
    </Container>
  );
};

export default Detection;
