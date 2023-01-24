import React from "react"
import {TextBlock} from "../"

const CustomSection = ({ sections }) => {

  const sectionResult = sections.map((section) => {

    return (
      <>
        {section?._type !== null &&
        section?._type !== undefined &&
        section?._type === "textBlock" ? (
          <TextBlock
            key={section._key}
            title={section.title}
            text={section._rawContent}
          />
        ) : null}

     
      </>
    )
  })

  return <>{sectionResult}</>
}

export default CustomSection
