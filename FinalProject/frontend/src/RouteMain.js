import React from "react";
import { Route, Routes } from "react-router-dom";
import { Footer, Header, Main, Menu } from "./components";
import './App.css';
import { CityInfoMain } from "./pages/cityinfo";
import { Calendar, Plan, DayPlan } from "./pages/plan";
import PlaceInfo from "./pages/cityinfo/PlaceInfo";

const RouteMain = () => {
  return (
    <div>
      <Header/>
      <Menu/>
      <Routes>
        <Route path="/" element={<Main/>} />

        {/* cityinfo */}
        <Route path="/cityinfo" element={<CityInfoMain/>} />

        {/* PlaceInfo */}
        <Route path="/place/citydetail" element={<PlaceInfo/>}/>

        {/* Planning */}
        <Route path="/plan/calendar" element={<Calendar/>} />
        <Route path="/plan" element={<Plan/>} />
        <Route path="/plan/:day" element={<DayPlan/>} />

      </Routes>
      <Footer/>
    </div>
  )
}

export default RouteMain;