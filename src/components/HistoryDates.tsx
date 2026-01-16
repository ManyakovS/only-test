import Cross from "./Cross";
import CircularSwiper from "./CircularSwiper";
import slides from "../data/slides";

const HistoryDates = () => {


  return (
    <div className="history-dates__container">
      {/* absolute */}
      <Cross className="desktop-only"/>
      <h2 className="history-dates__title text-h">Исторические<br/>даты</h2>

      {/* sticky */}
      <CircularSwiper slides={slides}/>  
    </div>
  );
};

export default HistoryDates;
