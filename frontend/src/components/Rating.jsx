import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 1;

    if (value >= number) {
      return <FaStar key={number} />;
    } else if (value >= number - 0.5) {
      return <FaStarHalfAlt key={number} />;
    } else {
      return <FaRegStar key={number} />;
    }
  });

  return (
    <div className="rating">
      {stars}
      {text && <span className="rating-text">{text}</span>}
    </div>
  );
};

export default Rating;
