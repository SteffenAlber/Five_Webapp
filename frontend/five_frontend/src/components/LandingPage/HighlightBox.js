import React from "react";
import PropTypes from "prop-types";

const HighlightBox = ({ title, place, likesNumber, imageSrc }) => {
  return (
    <div class="highlightImageBox">
      <div class="highlightImageContainer">
        <img src={imageSrc} alt={title} />
      </div>
      <div class="highlightInfoTextContainer">
        <div id="hash">
          <h2>#</h2>
        </div>
        <div id="highlightInfoText">
          <p>{title}</p>
          <p>{place}</p>
        </div>
      </div>
    </div>
  );
};

HighlightBox.propTypes = {
  title: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  likesNumber: PropTypes.number.isRequired,
  imageSrc: PropTypes.string.isRequired,
};

export default HighlightBox;
