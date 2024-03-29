import React from "react";
import { TextBlock, HelpCenter, Form, TextImage, TicketOffices, Promotions, StoryIntro} from "../";


const CustomSection = ({ sections }) => {
  const sectionResult = sections.map((section) => {
    
      if (
        section?._type !== null &&
        section?._type !== undefined &&
        section?._type === "storyIntro"
      ) {
        return (
          <StoryIntro
            key={section._key}
            title={section?.textBlock?.title}
            text={section?.textBlock?._rawContent}
            icon={section?.icon?.icon}
            link={section?.linkedPage?.slug?.current}
          />
        );
      }
      if (
        section?._type !== null &&
        section?._type !== undefined &&
        section?._type === "promotions"
      ) {
        return (
          <Promotions
            key={section._key}
            promotions={section.promotions}
          />
        );
      }
      if (
        section?._type !== null &&
        section?._type !== undefined &&
        section?._type === "textBlock"
      ) {
        return (
          <TextBlock
            key={section._key}
            title={section?.title}
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
          title={section.textBlock?.title}
          id={section.formId}
          text={section.textBlock?._rawContent}
          />
        )}
        if (
          section?._type !== null &&
          section?._type !== undefined &&
          section?._type === "textImage"
        ) {
        return (
          <TextImage
            key={section._key}
            title={section.textBlock?.title}
            text={section.textBlock?._rawContent}
            image={section.image?.image}
          />
        );
      }
      if (
        section?._type !== null &&
        section?._type !== undefined &&
        section?._type === "ticketOffices"
      ) {
      return (
        <TicketOffices
          key={section._key}
          title={section.textBlock?.title}
          text={section.textBlock?._rawContent}
        />
      );
    }
    
  });

  return <>{sectionResult}</>;
};

export default CustomSection;
