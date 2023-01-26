import React, { useEffect, useState } from "react";

type LazyLoadImageProps = {
  imageUrl?: string;
  backgroundSize?: string;
  backGroundOpacity?: number;
};

const LazyLoadImage = ({
  imageUrl = `url("")`,
  backgroundSize = "cover",
  backGroundOpacity = 0.5,
}: LazyLoadImageProps) => {
  const [image, setImage] = useState(`url("bg.svg")`);

  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = imageUrl;
    imageLoader.onload = () => {
      setImage(`url("${imageUrl}")`);
    };
  }, [imageUrl]);

  return (
    <React.Fragment>
      <div
        className="fixed w-full h-screen bg-gradient-to-br -z-50"
        style={{
          opacity: backGroundOpacity,
          backgroundSize: backgroundSize,
          backgroundImage: image,
          backgroundColor: "#080808",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
        }}
      ></div>
    </React.Fragment>
  );
};

export default LazyLoadImage;
