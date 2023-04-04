import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ImageInterface } from "../../interface/imageInterface";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";

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
      <button onClick={handleSort}>
        Sort {sortOrder === "asc" ? "Descending" : "Ascending"}
      </button>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          overflowY: "scroll",
          minHeight: "300px",
          maxHeight: "600px",
        }}
      >
        {sortedImages.map((image, index) => (
          <div
            key={index}
            style={{ width: "30%", padding: 5, position: "relative" }}
          >
            <Card sx={{ minWidth: 275 }}>
              <CardMedia
                component="img"
                image={image.url}
                alt={`Uploaded picture ${index + 1}`}
              />
              <CardContent>
                <Typography sx={{ fontSize: 16 }} gutterBottom>
                  {image.name}
                </Typography>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                  {t("result.Result")} {image.result[1]}
                  {"% "}
                </Typography>
                <Typography variant="body2">
                  {image.result[0] > image.result[1] &&
                    t("result.ResultNormal")}{" "}
                  {image.result[0] < image.result[1] &&
                    t("result.ResultGlaucoma")}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
