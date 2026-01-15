import React from "react";
import Cross from "./Cross";
import CircularSwiper from "./CircularSwiper";
import slides from "../data/slides";

const HistoryDates = () => {


  return (
    <div className="container">
      {/* absolute */}
      <Cross />
      <h2 className="history-dates__title">Исторические<br/>даты</h2>

      <CircularSwiper slides={slides}/>  
    </div>
  );
};

export default HistoryDates;
