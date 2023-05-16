import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ImageInterface } from "../../interface/imageInterface";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

export default function ResultField({ images }: { images: ImageInterface[] }) {
  const { t } = useTranslation();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sortedImages = images.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.result[1] - b.result[1];
    } else {
      return b.result[1] - a.result[1];
    }
  });

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <Button variant="contained" onClick={handleSort} sx={{ marginBottom: 2 }}>
        {t("result.Sort")}{" "}
        {sortOrder === "asc" ? t("result.ASC") : t("result.DESC")}
      </Button>

      <Grid container spacing={2}>
        {sortedImages.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={image.name}>
            <Card>
              <CardMedia
                component="img"
                image={image.url}
                alt={`Uploaded picture ${index + 1}`}
              />
              <CardContent>
                <Typography sx={{ fontSize: 16 }} gutterBottom>
                  {image.name}
                </Typography>
                <Typography variant="body2">
                  {image.result[0] > image.result[1] &&
                    t("result.ResultNormal")}{" "}
                  {image.result[0] < image.result[1] &&
                    t("result.ResultGlaucoma")}
                </Typography>
                <Typography variant="body2" color={"red"}>
                  {image.result[0] < image.result[1] &&
                    t("result.HighRiskAlert")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
