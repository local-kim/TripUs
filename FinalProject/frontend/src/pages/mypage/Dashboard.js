import React, {Component, useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import './Dashboard.css';
import axios from 'axios';

const Dashboard = (props) => {
    const[citytrip,setCityTrip] = useState('');


    let citytripUrl=process.env.REACT_APP_SPRING_URL + "mypage/citytrip?currentPage=1";

    const  citytriplist = () => {
    

        axios.get(citytripUrl)
        .then(res => {
        setCityTrip(res.data.list);
        console.log(res.data.list);
        })
        .catch(err => {
        alert(err.data);
        });
    }

        useEffect(() => {
             
            citytriplist();
      
           
        }, []); //currentPage가 변경될때마다 다시 호출
            

    return (
        <div>
            <div className="App">
                <FullCalendar  defaultView="dayGridMonth" plugins={[ dayGridPlugin ]}

                
                events={[
                    {title:'start', date: `${citytrip[0].startDate}`},
                    
                ]}

                
                
                />

            </div>
      </div>
    );
};

export default Dashboard;