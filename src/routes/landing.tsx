import React, { useContext, useEffect, useState } from "react";
import PageContainer from "../components/containers/PageContainer";
import { useHistory } from "react-router-dom";

import { Box, Button, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ImageContext } from "../context/imageContext";
import DecoImg from "../assets/DecoImg.svg";

const Landing = () => {
  const [language, setLanguage] = useState("English");
  const { t } = useTranslation();
  const { images, setImages } = useContext(ImageContext);
  useEffect(() => {
    setImages([]);
  }, []);

  const handleLanguageChange = () => {
    setLanguage(language === "English" ? "Thai" : "English");
  };
  const history = useHistory();
  const handleGettingStart = () => {
    history.push("/detection");
  };
  return (
    <div>
      <Container>
        <h1>{t("langing.Glaucoma Checker")}</h1>
        <div className="info-padding">
          <div className="information">
            {/* <p>{t("langing.Description")}</p> */}
            <p>{t("langing.Getting Start")}</p>
            <Button
              variant="contained"
              disableElevation
              onClick={handleGettingStart}
              color="primary"
              id="getting-start-button"
            >
              {t("langing.Start")}
            </Button>
          </div>
          <div className="decoration-picture">
            <img src={DecoImg} alt="Decoration Picture" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Landing;
