import React, { useState, useCallback } from "react";
import PageContainer from "../components/containers/PageContainer";
import { useDropzone } from "react-dropzone";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Box, Container, Button } from "@mui/material";
import { color } from "@mui/system";

const Detection = () => {
  const [step, setStep] = useState(0);

  const steps = ["Upload", "Review", "Result"];
  //---picture drop
  const [imageUrl, setImageUrl] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageUrl(reader.result as string);
    };

    reader.readAsDataURL(file);

    setStep(1);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
          marginTop: 4,
        }}
      >
        <Button variant="contained" sx={{ alignSelf: "center" }}>
          Select Pictures
        </Button>
        <Box>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the picture here ...</p>
            ) : (
              <p>Drag and drop a picture here, or click to select a picture</p>
            )}
            {imageUrl && (
              <div>
                <img src={imageUrl} alt="Uploaded picture" />
              </div>
            )}
          </div>
        </Box>
      </Box>
    </Container>
  );
};

export default Detection;
