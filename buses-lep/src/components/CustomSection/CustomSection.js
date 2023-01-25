import React from "react";
import { TextBlock, HelpCenter} from "../";

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
    }
  });

  return <>{sectionResult}</>;
};

export default CustomSection;
