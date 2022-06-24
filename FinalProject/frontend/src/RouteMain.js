import React from "react";
import { Route, Routes } from "react-router-dom";
import { Footer, Header, Main, Menu } from "./components";
import './App.css';
import { CityInfoMain } from "./pages/cityinfo";

const RouteMain = () => {
  return (
    <div>
      <Header/>
      <Menu/>
      <Routes>
        <Route path="/" element={<Main/>} />

        {/* cityinfo */}
        <Route path="/cityinfo" element={<CityInfoMain/>} />

      </Routes>
      <Footer/>
    </div>
  )
}

export default RouteMain;