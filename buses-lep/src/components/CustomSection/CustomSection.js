import React from "react";
import { TextBlock, HelpCenter, Form} from "../";

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
        section?._type === "form"
      ) {
        return (
          <Form
          key={section._key}
          title={section.textBlock.title}
          id={section.formId}
          text={section.textBlock._rawContent}
          />
        );
      }
    }
  });

  return <>{sectionResult}</>;
};

export default CustomSection;
