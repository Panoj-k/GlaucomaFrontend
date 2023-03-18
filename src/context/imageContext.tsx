import Image from "../interface/imageInterface";

import React, {
  useState,
  createContext,
  SetStateAction,
  Dispatch,
} from "react";

export const AppContext = createContext(null);

// export interface Image {
//   url: string;
//   name: string;
// }

export interface ImageContextStruct {
  images: Image[];
  setImages: Dispatch<SetStateAction<Image[]>>;
}

export const ImageContext = createContext({} as ImageContextStruct);

const ImageContextProvider = ({ ...props }) => {
  const [images, setImages] = useState<Image[]>([]);
  const value = { images, setImages };

  return <ImageContext.Provider value={value} {...props} />;
};

export default ImageContextProvider;
