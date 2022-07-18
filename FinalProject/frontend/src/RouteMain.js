import React from "react";
import { Route, Routes } from "react-router-dom";
import { FinalHead, Footer, Header, Main, Menu } from "./components";
import './App.css';
import './AppHeemin.css';
import { CityInfoMain, CityinfoMore, PlaceInfo } from "./pages/cityinfo";
import { Calendar, Plan, DayPlan, UpdatePlan, UpdateDayPlan } from "./pages/plan";
import { JoinForm, Auth, LoginForm, LoginFormTest, KakaoLogin, GoogleLogin } from "./pages/login";
import { PlanDetail } from "./pages/detail";
import { Mypage, Dashboard, Profile } from "./pages/mypage";
import { CityList } from './pages/citylist';
// import SecurityLogin from "./pages/login/SecurityLogin";
// import SecurityJoin from "./pages/login/SecurityJoin";

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
          <Route path="/city/:num" element={<CityInfoMain/>} />
          <Route path="/city/:city_num/:member_num" element={<CityInfoMain/>} />
          <Route path="/city/infomore" element={<CityinfoMore/>}/>
          {/* <Route path="/city/weather/:num" element={<CityInfoMain/>} /> */}
          {/* <Route path="/city/placename/:name" element={<CityInfoMain/>} /> */}

          {/* Member */}
          <Route path="/join" element={<JoinForm/>} />
          {/* <Route path="/join" element={<SecurityJoin/>} /> */}
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/loginTest" element={<LoginFormTest/>} />
          {/* <Route path="/login" element={<SecurityLogin/>} /> */}
          <Route path="/oauth/kakao/callback"  element={<Auth/>} />
          <Route path="/kakao"  element={<KakaoLogin/>}/>
          <Route path="/google" element={<GoogleLogin/>}/>

          {/* Planning */}
          <Route path="/plan/calendar/:cityNum" element={<Calendar/>} />
          <Route path="/plan" element={<Plan/>} />
          <Route path="/plan/:day" element={<DayPlan/>} />

          {/* Update Plan */}
          <Route path="/plan/update/:tripNum" element={<UpdatePlan/>} />
          <Route path="/plan/update/:tripNum/:day" element={<UpdateDayPlan/>} />
          
          {/* PlaceInfo */}
          {/* <Route path="/place/placedetail" element={<PlaceInfo/>}/> */}
          <Route path="/place/placedetail" element={<PlaceInfo/>}/>

          {/* Detail-Plan */}
          <Route path="/plan/detail/:num" element={<PlanDetail />} />

          {/* mypage */}
          <Route path="/mypage/:currentPage" element={<Mypage/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/mypage/profile" element={<Profile/>}/>
          {/* <Route path='mypage//:num/:currentPage' element={</>}/> */}
          {/* <Route path="/mypage/list/:currentPage" element={<Mypage/>}/> */}

        </Routes>
      </div>
    </div>
  )
}

export default RouteMain;


