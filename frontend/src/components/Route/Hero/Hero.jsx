import React from "react";
import styles from "../../../styles/styles";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <Link to="/products">
      <div
        className={`relative min-h-[40vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
        style={{
          backgroundImage:
            "url(https://kbfashion.vn/resources/assets/images/slider_images/1682045476_000000077.jpg)",
          //   backgroundImage: "url(https://kbfashion.vn/resources/assets/images/slider_images/1678768744_000000073.jpg)"
        }}
      ></div>
    </Link>
  );
};

export default Hero;
