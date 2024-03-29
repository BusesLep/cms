import React from "react";
import SanityImage from "gatsby-plugin-sanity-image";

const ImageBlock = ({ images, title }) => {
  const imageList = images.map((img) => (
    <a
      href={img.url}
      title={`${img.alt}`}
      className="py-2"
      key={img._key}
    >
      <SanityImage
        {...img.image.image}
        alt={`${img.alt}`}
      />
    </a>
  ));
  return (
    <div className="py-2 mt-3 contactBlock__images">
      <h5 className="title-small mb-3 py-0">{title}</h5>
      <div className="row">{imageList}</div>
    </div>
  );
};

export default ImageBlock;
