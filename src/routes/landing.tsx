import React, { useState } from "react";
import PageContainer from "../components/containers/PageContainer";
import { useHistory } from "react-router-dom";

import { Button, Container } from "@mui/material";
import { useTranslation } from "react-i18next";

const Landing = () => {
  const [language, setLanguage] = useState("English");
  const { t } = useTranslation();

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
        <div className="info-padding">
          <h1>{t("langing.Glaucoma Checker")}</h1>
        </div>
        <Button
          variant="contained"
          disableElevation
          onClick={handleGettingStart}
          color="primary"
          id="getting-start-button"
        >
          {t("langing.Start")}
        </Button>
      </Container>
    </div>
  );
};

export default Landing;
