import { useContext } from "react";
import { MediaContext, MediaContextType } from "../context/MediaContext";

export const useMedia = (): MediaContextType => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error("useMedia must be used within a MediaProvider");
  }
  return context;
};
