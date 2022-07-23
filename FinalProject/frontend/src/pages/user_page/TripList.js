import React from 'react';
import { useNavigate } from 'react-router-dom';

const TripList = ({tripList}) => {
  const navi = useNavigate();

  return (
    <div className='trip-list'>
      {
        tripList.length === 0 ? (
          <div style={{textAlign:'center', color: 'gray', marginTop:'100px'}}>여행 일정이 없습니다.</div>
        ) : ""
      }
      {
        tripList && tripList.map((trip, index) => (
          <div className="trip uk-card uk-card-default uk-grid-collapse uk-grid" style={{ padding: "16px" }} onClick={() => navi(`/plan/detail/${trip.tripNum}`)} key={index}>
            <div className="uk-width-1-3@m uk-first-column">
              <div className="uk-grid">
                <div className="uk-width-1-2 info-container uk-first-column">
                  <img
                    className="imgclass"
                    src={`../city_image/${trip.image}`}
                    alt={trip.image}
                  />
                  {/* <div
                    className="d-day-circle"
                    style={{
                      backgroundColor:
                        calculateDday(trip.startDate) < 0 && calculateDday(trip.endDate) > 0
                          ? "red"
                          : calculateDday(trip.startDate) === 0
                          ? "orange"
                          : calculateDday(trip.startDate) < 0
                          ? "gray"
                          : "",
                    }}
                  >
                    {calculateDday(trip.startDate) === 0 ? (
                      "디데이"
                    ) : calculateDday(trip.startDate) > 0 ? (
                      `D-${calculateDday(trip.startDate)}`
                    ) : calculateDday(trip.endDate) > 0 ? (
                      <div style={{ backgroundColor: "red" }}>"여행중"</div>
                    ) : (
                      "지난일정"
                    )}
                  </div> */}
                </div>
                <div className="uk-width-1-2 info-container">
                  <div className="travel-title">{trip.eng_name}</div>
                  <div className="uk-text-meta">
                    {trip.country} {trip.cityName}
                  </div>
                  <div className="info-container" style={{ marginTop: "20px", backgroundColor: "white" }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        backgroundColor: "#f6f6f6",
                        color: "black",
                        fontWeight: "700",
                      }}
                    >
                      {trip.days - 1}박 {trip.days}일
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="uk-width-2-3@m">
              <div className="uk-grid uk-grid-stack" uk-grid="">
                <div className="uk-width-expand@m uk-first-column">
                  <div className="small-title">
                    <span>여행이름</span>

                    <span className="
                        uk-input123
                        uk-form-blank
                        uk-form-width-medium
                        small-text
                      "
                      id="inputTravelName_idx_0"
                      style={{ width: "150px" }}
                    >{trip.tripName}</span>

                    <span style={{ marginLeft: "30px" }}>여행일자</span>

                    <span className="small-text" style={{ paddingTop: "20px" }}>
                      <span style={{ paddingTop: "10px" }}>
                        {trip.startDate} ~ {trip.endDate}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default TripList;