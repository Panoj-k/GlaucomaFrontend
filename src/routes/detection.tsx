import React, { useState, useCallback } from "react";
import PageContainer from "../components/containers/PageContainer";
import { useDropzone } from "react-dropzone";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Box, Container, Button } from "@mui/material";
import { color } from "@mui/system";

interface Props {
  buttonText?: string;
}

interface Image {
  url: string;
  name: string;
}

const Detection = () => {
  const [step, setStep] = useState(0);
  const [isImageEmpty, setIsImageEmpty] = useState(false);

  const steps = ["Upload", "Review", "Result"];
  //---picture drop
  const [images, setImages] = useState<Image[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

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

  const handleCheck = () => {
    setStep(2);
    // send images to check
  };

  return (
    <Container>
      {/* <PageContainer> */}
      <h2>Detection page</h2>
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
      <h6>
        Upload step: Please drag and drop pictures in the box below or click
        select pictures button to add pictures.
        <br />
        Accepted File Types: .jpg, .png, .tif. Maximum picture at 20.
      </h6>
      <Box
        textAlign={"center"}
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
          margin: 4,
        }}
      >
        <Box>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the pictures here ...</p>
            ) : (
              <p>
                Drag and drop pictures here, or click select pictures pictures
                <br />
                <br />
                <Button variant="contained" sx={{ alignSelf: "center" }}>
                  Select Pictures
                </Button>
              </p>
            )}
          </div>
          {images.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {images.map((image, index) => (
                <div key={index} style={{ width: "30%", padding: 5 }}>
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
                </div>
              ))}
            </div>
          )}
        </Box>
      </Box>
      <Box textAlign={"center"} sx={{ marginBottom: 2 }}>
        <Button variant="contained" disabled={isImageEmpty}>
          Check
        </Button>
        <p>{isImageEmpty && <h6>testtest </h6>}</p>
      </Box>
    </Container>
  );
};

export default Detection;
