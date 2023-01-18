import React from "react";
import SanityImage from "gatsby-plugin-sanity-image";
import "./Footer.scss";
import useFooter from "../../hooks/useFooter";
import { useTheme } from "../../context/themeContext";
import FooterLinkBlock from "./FooterLinkBlock";
import SocialMediaBlock from "./SocialMediaBlock";

const Footer = () => {
  const data = useFooter().sanityFooter;
  console.log(data);
  const { theme } = useTheme();

  return (
    data !== null && (
      <footer className="footer">
        <div className="container py-4 d-flex flex-wrap">
          {data.linkBlock.length !== 0 &&
            data.linkBlock.map((block) => (
              <FooterLinkBlock links={block.links} title={block.title} />
            ))}

          {data.socialMediaBlock !== null && (
            <div className="col-12 col-md-4">
              <div className="row">
                {data.qrCode && (
                <a href={data.qrCode.url} className="py-2">
                  <SanityImage
                    {...data.qrCode.image}
                    alt={`${data.qrCode.image.alt}`}
                    className="qrCode"
                  />
                </a>
              )}
              <SocialMediaBlock
                links={data.socialMediaBlock.links}
                title={data.socialMediaBlock.title}
              />
              </div>
              
            </div>
          )}
        </div>
        <div className="footer__down">
          <div className="container d-flex justify-content-end align-items-center py-4">
            {theme === "dark" ? (
              <SanityImage
                {...data.logo.imageDark}
                alt={`${data.logo.image.alt}`}
                className="header__logo"
              />
            ) : (
              <SanityImage
                {...data.logo.image}
                alt={`${data.logo.image.alt}`}
                className="header__logo"
              />
            )}
          </div>
        </div>
      </footer>
    )
  );
};

export default Footer;
