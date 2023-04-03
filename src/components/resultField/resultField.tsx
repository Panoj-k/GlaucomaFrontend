import { useState } from "react";
import { ImageInterface } from "../../interface/imageInterface";

export default function ResultField({ images }: { images: ImageInterface[] }) {
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
        {sortedImages.map((image) => (
          <div key={image.name}>
            <img src={image.url} alt={image.name} />
            <p>Probability: {image.result[1]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
