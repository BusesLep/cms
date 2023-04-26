import React from "react";

import "./Promotions.scss";
import SanityImage from "gatsby-plugin-sanity-image";

const Promotions = ({ promotions }) => {

  return (
    <div className="promotions py-3">
      {promotions.map((promotion) => (
        <a
          className="promotionCard"
          target={promotion?.link?.url ? "_blank" : "_self"}
          rel={promotion?.link?.url ? "noreferrer" : ""}
          href={
            `/${promotion?.linkedPage?.slug?.current}` ||
            `${promotion?.link?.url}`
          }
          key={promotion._key}
        >
          <div className="promotionCard__image">
            {promotion.image?.image !== null ? (
              <SanityImage
                {...promotion?.image?.image}
                alt={`${promotion?.image?.alt}`}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="promotionCard__details">
            {promotion.subtitle && (
              <p className="promotionCard__subtitle">{promotion.subtitle}</p>
            )}
            <h5 className="title-small py-0 promotionCard__title">{promotion?.title}</h5>
            {promotion?.images?.length > 1 && (
              <div className="promotionCard__images">
                {promotion.images.map((image) => (
                  <div className="promotionCard__images_icon" key={image.image.asset._id}>
                    <SanityImage {...image.image} alt={`${image.alt}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {promotion?.images?.length === 1 && (
            <div className="promotionCard__qr">
              <SanityImage
                {...promotion?.images[0].image}
                alt={`${promotion?.images[0].alt}`}
              />{" "}
            </div>
          )}
        </a>
      ))}
    </div>
  );
};

export default Promotions;
