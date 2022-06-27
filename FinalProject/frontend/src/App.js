import React from "react";
import { BrowserRouter } from 'react-router-dom';
import RouteMain from "./RouteMain";
import './App.css';

function App() {
  return (
    <div className="main-main-back">
      <BrowserRouter>
        <RouteMain/>
      </BrowserRouter>
    </div>
  );
}

export default App;
