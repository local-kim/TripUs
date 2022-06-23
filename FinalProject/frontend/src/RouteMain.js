import React from "react";
import { Route, Routes } from "react-router-dom";
import { Footer, Header, Main, Menu } from "./components";
import './App.css';

const RouteMain = () => {
  return (
    <div>
      <Header/>
      <Menu/>
      <Routes>
        <Route path="/" element={<Main/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default RouteMain;