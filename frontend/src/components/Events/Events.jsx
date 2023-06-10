import React from "react";
// import { productData } from "../../static/data";
import styles from "../../styles/styles";
// import ProductCard from "../Route/ProductCard/ProductCard";
import EventCard from "./EventCard.jsx";
const Events = () => {
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Popular Events</h1>
        </div>
        <div className="w-full grid">
          <EventCard />
        </div>
      </div>
    </div>
  );
};

export default Events;
