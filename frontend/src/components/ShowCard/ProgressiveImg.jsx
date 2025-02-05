import { useState, useEffect } from "react";

const ProgressiveImg = ({ placeholderSrc, flip, src, ...props }) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

  const flipState = flip && flip ? " on" : "";
  const loadState =
    placeholderSrc && imgSrc === placeholderSrc ? " loading" : " loaded";

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
      className={`cardFront${loadState}${flipState}`}
    />
  );
};
export default ProgressiveImg;
