import React from "react";
import Carousel from "react-bootstrap/Carousel";
import SanityImage from "gatsby-plugin-sanity-image";

import "./Banner.scss";

const Banner = ({ banner }) => {
  const slides = banner.slides.map((slide) => (
    <Carousel.Item>
      <div className={`img ${slide.overlay ? 'overlay' : ''}`}>
        <SanityImage {...slide.image} alt={`${slide.image.alt}`} />
      </div>
      <Carousel.Caption>
        {slide.title !== null ? <h3>{slide.title}</h3> : <></>}
        {slide.text !== null ? <p>{slide.text}</p> : <></>}
      </Carousel.Caption>
    </Carousel.Item>
  ));
  return (
    <Carousel interval={banner.autoplay ? 4000 : null}>
      {slides}
    </Carousel>
  );
};

export default Banner;
