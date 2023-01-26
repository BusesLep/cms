import React from "react";
import { TextBlock, HelpCenter, TextImage} from "../";

const CustomSection = ({ sections }) => {
  const sectionResult = sections.map((section) => {
    {
      if (
        section?._type !== null &&
        section?._type !== undefined &&
        section?._type === "textBlock"
      ) {
        return (
          <TextBlock
            key={section._key}
            title={section.title}
            text={section._rawContent}
          />
        );
      }
      if (
        section?._type !== null &&
        section?._type !== undefined &&
        section?._type === "helpCenter"
      ) {
        return (
          <HelpCenter
            key={section._key}
            title={section.title}
            questions={section.questions}
          />
        );
      }
      if (
        section?._type !== null &&
        section?._type !== undefined &&
        section?._type === "textImage"
      ) {
        console.log(section)
        return (
          <TextImage
            key={section._key}
            title={section.textBlock.title}
            text={section.textBlock._rawContent}
            image={section.image}
          />
        );
      }
    }
  });

  return <>{sectionResult}</>;
};

export default CustomSection;
