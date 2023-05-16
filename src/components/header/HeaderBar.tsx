import React, { useState, useContext, useEffect, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import HomeIcon from "@mui/icons-material/Home";
import TranslateIcon from "@mui/icons-material/Translate";
import { useHistory } from "react-router-dom";
import { Language, useLanguage } from "../../translations/i18n";

import { Button, Divider, Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function MenuAppBar() {
  const { t } = useTranslation();
  const languages = ["en", "th"];
  const { changeLanguage } = useLanguage();
  const [elevation, setElevation] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleLanguageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLanguageSelect = (lang: Language) => {
    changeLanguage(lang);
    handleClose();
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setElevation(4);
      } else {
        setElevation(0);
      }
    });
  }, []);

  const history = useHistory();
  const handleHomeClick = () => {
    history.push("/");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, marginBottom: 10 }}>
        <AppBar
          className="MuiToolbar-center"
          elevation={elevation}
          color="primary"
        >
          <Container maxWidth="lg">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="home"
                sx={{ mr: 2 }}
                onClick={handleHomeClick}
              >
                <HomeIcon sx={{ color: "#FFFFFF" }} />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                align="center"
                sx={{ flexGrow: 1, fontWeight: "bold" }}
              >
                Glaucoma Detection Tool
              </Typography>

              <div>
                <Button
                  variant="contained"
                  disableElevation
                  aria-label="language-change"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleLanguageButtonClick}
                  color="primary"
                  endIcon={<TranslateIcon />}
                  sx={{ color: "#259F87", background: "#FFFFFF" }}
                >
                  {t("currentLanguage")}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={() => handleLanguageSelect("th")}>
                    ภาษาไทย
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => handleLanguageSelect("en")}>
                    English
                  </MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
}
