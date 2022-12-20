import { memo } from "react";
import { ILazyImage } from "@interfaces/LazyImage.interface";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
// import LoadingImage from "@assets/images/loading.gif";
function LazyImage(item: ILazyImage) {
  return (
    <LazyLoadImage
      className={item.className}
      src={item.src}
      alt={item.alt}
      placeholderSrc={item.loadingImage || ""}
      effect="blur"
    />
  );
}

export default memo(LazyImage);
