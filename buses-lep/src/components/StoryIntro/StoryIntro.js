import React from "react";
import { PortableText } from "@portabletext/react";
import { useTheme } from "../../context/themeContext";
import { Icon } from "../";
import "./StoryIntro.scss";

const StoryIntro = ({ title, text, icon, link }) => {
  const { theme} = useTheme();

  return (
    <div className="storyContainer px-3 my-5">
      {text && (
        <div className="storyIntro pt-3">
          {icon && <Icon size={50} color={theme === "dark" ? "white" : "black"} code={icon}></Icon>}
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
    </div>
  );
};

export default StoryIntro;
