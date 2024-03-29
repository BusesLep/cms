import React from "react";
import SanityImage from "gatsby-plugin-sanity-image";
import "./Footer.scss";
import useFooter from "../../hooks/useFooter";
import { useTheme } from "../../context/themeContext";
import FooterLinkBlock from "./FooterLinkBlock";
import SocialMediaBlock from "./SocialMediaBlock";
import ImageBlock from "./ImageBlock";

const Footer = () => {
  const data = useFooter().sanityFooter;
  const { theme } = useTheme();
  
  const regularCondition = (data.logo.image.image !== null ? <SanityImage
    {...data.logo.image.image}
    alt={`${data.logo.image.alt}`}
    className="footer__logo"
  /> : <></>
  )

  const checkImage = (data.logo.imageDark !== null ? <SanityImage
    {...data.logo.imageDark}
    alt={`${data.logo.image.alt}`}
    className="footer__logo"
  /> : <></>)

  return (
    data !== null && (
      <footer >
        <div className="footer mt-4">
          <div className="container py-4 d-flex flex-wrap">
            {data.linkBlock.length !== 0 &&
              data.linkBlock.map((block) => (
                <FooterLinkBlock
                  key={block._key}
                  links={block.links}
                  title={block.title}
                />
              ))}

            <div className="col-12 col-md-4 flex-md-grow-1 ">
              <div className="contactBlock">
                {data.qrCode && (
                  <a
                    href={data.qrCode.url}
                    title={`${data.qrCode.image.alt}`}
                    className="py-2"
                  >
                    <SanityImage
                      {...data.qrCode.image.image}
                      alt={`${data.qrCode.image.alt}`}
                      className="qrCode"
                    />
                  </a>
                )}
                <div>
                  {data.socialMediaBlock && (
                    <SocialMediaBlock
                      links={data.socialMediaBlock.links}
                      title={data.socialMediaBlock.title}
                    />
                  )}
                  {data.imageLinkBlock && (
                    <ImageBlock
                      images={data.imageLinkBlock.images}
                      title={data.imageLinkBlock.title}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="footer__down">
          <div className="container d-flex justify-content-end align-items-center py-3">
            { 
              theme === "dark" ? (
                checkImage
              ) : regularCondition}
          </div>
        </div>
      </footer>
    )
  );
};

export default Footer;
