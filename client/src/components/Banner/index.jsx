import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

function Banner({ urlImg, title, children }) {
  return (
    <div className="banner" data-testid="banner">
      <img src={urlImg} alt="Banner image" className="banner-img" />
      <div className="banner-content">
        <h2 className="banner-title">{title}</h2>
        <p className="banner-body">{children}</p>
      </div>
    </div>
  );
}

Banner.propTypes = {
  urlImg: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.string,
};

Banner.defaultProps = {
  urlImg: "https://via.placeholder.com/1440x400.png",
  title: "Banner title",
  children:
    "Loren ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero in dui mattis, nec aliquam odio fermentum",
};

export default Banner;
