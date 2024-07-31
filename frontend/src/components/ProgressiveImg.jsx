import { useState, useEffect } from "react";

const ProgressiveImg = ({ placeholderSrc, src, ...props }) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

  const flipState = props.flip && props.flip ? "on" : "";
  const loadState =
    placeholderSrc && imgSrc === placeholderSrc ? "loading" : "loaded";

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };
  }, [src]);

  return (
    <img
      {...{ src: imgSrc, ...props }}
      alt={props.alt || ""}
      className={`cardFront ${flipState} ${loadState}`}
    />
  );
};
export default ProgressiveImg;
