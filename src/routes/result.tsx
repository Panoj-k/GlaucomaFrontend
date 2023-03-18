import React, { useState, useCallback, useEffect } from "react";
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

const Result = () => {
  const steps = ["Upload", "Review", "Result"];
  const { t } = useTranslation();

  return (
    <Container>
      <h2>Detection result</h2>
      <Box sx={{ display: "grid", placeItems: "center" }}>
        <Stepper
          activeStep={2}
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
    </Container>
  );
};

export default Result;
