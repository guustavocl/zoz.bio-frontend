import { useEffect, useState } from "react";

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
  const [image, setImage] = useState(`url("")`);

  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = imageUrl;
    imageLoader.onload = () => {
      setImage(`url("${imageUrl}")`);
    };
  }, [imageUrl]);
  // TODO - maybe refactor this
  return (
    <div
      className="fixed -z-50 h-screen w-full bg-gradient-to-br"
      style={{
        opacity: backGroundOpacity,
        backgroundSize: backgroundSize,
        backgroundImage: image,
        backgroundColor: "#080808",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
      }}
    ></div>
  );
};

export default LazyLoadImage;
