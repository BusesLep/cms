import React from "react";
import { PortableText } from "@portabletext/react";
import SanityImage from "gatsby-plugin-sanity-image";
import "./StoryIntro.scss";

const StoryIntro = ({ title, text, icon, link }) => {
  return (
    <>
      {text && (
        <div className="storyIntro pt-3">
          {icon && (
            <SanityImage
              {...icon}
              alt={`${title}`}
              className="storyIntro__image"
            />
          )}
          <div className="storyIntro__details">
            {title && <h3 className="storyIntro__title">{title}</h3>}
            <div className="storyIntro__content">
              <div className="storyIntro__text">
                <PortableText value={text} />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="storyIntro__button_container pb-3">
        <a className="storyIntro__button" href={link}>LEER MÁS</a>
      </div>
    </>
  );
};

export default StoryIntro;
