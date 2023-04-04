import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ImageInterface } from "../../interface/imageInterface";

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
      <div>
        {sortedImages.map((image, index) => (
          <div
            key={index}
            style={{ width: "30%", padding: 5, position: "relative" }}
          >
            <img
              id={`glaucomaImage${index}`}
              src={image.url}
              alt={`Uploaded picture ${index + 1}`}
              style={{ width: "100%", height: "auto" }}
            />
            <p> {image.name}</p>
            <p>
              {t("result.Result")} {image.result[1]}
              {"% "}
            </p>
            {/* <p> {t("result.ResultNormal")}</p> */}
            <p>
              {image.result[0] > image.result[1] && t("result.ResultNormal")}{" "}
              {image.result[0] < image.result[1] && t("result.ResultGlaucoma")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
