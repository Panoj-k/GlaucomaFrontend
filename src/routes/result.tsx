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
import ResultField from "../components/resultField/resultField";

const Result = () => {
  const steps = ["Upload", "Review", "Result"];
  const { t } = useTranslation();
  const history = useHistory();

  const { images, setImages } = useContext(ImageContext);

  const handleCheckMore = () => {
    setImages([]);
    history.push("/detection");
  };

  return (
    <Container>
      <h2>{t("result.Name")}</h2>
      <Box sx={{ display: "grid", placeItems: "center" }}>
        <Stepper
          activeStep={2}
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
      <Box
        textAlign={"center"}
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
          margin: 2,
          maxHeight: 600,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            overflowY: "scroll",
            minHeight: "300px",
            maxHeight: "600px",
          }}
        >
          <ResultField images={images} />
        </div>
      </Box>
      <Box textAlign={"center"} sx={{ marginBottom: 2 }}>
        <Button variant="contained" onClick={handleCheckMore}>
          {t("result.New Picture Button")}
        </Button>
      </Box>
    </Container>
  );
};

export default Result;
