import React from "react";
import { Route, Routes } from "react-router-dom";
import { FinalHead, Footer, Header, Main, Menu } from "./components";
import './App.css';
import './AppHeemin.css';
import { CityInfoMain, PlaceInfo } from "./pages/cityinfo";
import { Calendar, Plan, DayPlan } from "./pages/plan";
import { JoinForm, Auth,LoginForm, KakaoLogin } from "./pages/login";
import { PlanDetail } from "./pages/detail";

import {Mypage, Dashboard, Profile} from "./pages/mypage";
import { CityList } from './pages/citylist';
// import { Dashboard } from "./pages/mypage";

const RouteMain = () => {
 
  return (
    <div className="main-main-back">
      <Menu/>

      <div id="main">
        <Routes>
          <Route path="/" element={<Main/>} />

          {/* City List */}
          <Route path="/city/list" element={<CityList/>} />

          {/* cityinfo */}
          <Route path="/cityinfo/:num" element={<CityInfoMain/>} />
          {/* <Route path="/cityinfo/weather/:num" element={<CityInfoMain/>} /> */}
          {/* <Route path="/cityinfo/placename/:name" element={<CityInfoMain/>} /> */}

          {/* Member */}
          <Route path="/join" element={<JoinForm/>} />
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/oauth/kakao/callback"  element={<Auth/>} />
          <Route path="/profile"  element={<KakaoLogin/>} />
    
          {/* Planning */}
          <Route path="/plan/calendar" element={<Calendar/>} />
          <Route path="/plan" element={<Plan/>} />
          <Route path="/plan/:day" element={<DayPlan/>} />
          
          {/* PlaceInfo */}
          <Route path="/place/placedetail" element={<PlaceInfo/>}/>

          {/* Detail-Plan */}
          <Route path="/plan/detail/:num" element={<PlanDetail />} />

          {/* mypage */}
          <Route path="/mypage" element={<Mypage/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/mypage/profile" element={<Profile/>}/>

        </Routes>
      </div>
    </div>
  )
}

export default RouteMain;


