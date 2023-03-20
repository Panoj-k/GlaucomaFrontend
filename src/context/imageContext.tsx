import { ImageInterface } from "../interface/imageInterface";

import React, {
  useState,
  createContext,
  SetStateAction,
  Dispatch,
} from "react";

export const AppContext = createContext(null);

export interface ImageContextStruct {
  images: ImageInterface[];
  setImages: Dispatch<SetStateAction<ImageInterface[]>>;
}

export const ImageContext = createContext({} as ImageContextStruct);

const ImageContextProvider = ({ ...props }) => {
  const [images, setImages] = useState<ImageInterface[]>([]);
  const value = { images, setImages };

  return <ImageContext.Provider value={value} {...props} />;
};

export default ImageContextProvider;
