import React, {Component, useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import './Dashboard.css';
import axios from 'axios';
import moment from 'moment';

const Dashboard = () => {
    const[trip,setTrip] = useState('');


    let calendarUrl=process.env.REACT_APP_SPRING_URL + "calendar/";
    let dDay; 

    const calendar=()=>{
        axios.get(calendarUrl)
        .then(res=>{
            setTrip(res.data);
            console.log(res.data);
            
        })
        .catch(err => {
            alert(err);
        })
      }


      const calculateDday = (date) => {
            
        const nowTime = moment();
        const lastTime = moment(date);
        dDay = Math.floor((lastTime - nowTime)/86400000)+1;


        return dDay;
        

    }

      useEffect(()=>{
        calendar();
    },[]);
            

    return (
        <div>


            <div className="App" style={{height:'100%'}}>

                    
                    <FullCalendar  defaultView="dayGridMonth" plugins={[ dayGridPlugin ]}

                
                            
                                    
                                    events=
                                        {trip && trip.map((row, index)=>(
                                           
                                            {                                               
                                                title : row.name, 
                                                color :calculateDday(row.startDate) < 0 && calculateDday(row.endDate) > 0 ? "red" : calculateDday(row.startDate) < 0 ? "gray" : "", //기본이 그냥 파랑임
                                                start: row.startDate,
                                                end: row.endDate,
                                                                                      
                                            }
    
                                        ))}
                                        
                                    
                        

                
                />
             
            </div>
            
      </div>
    );
};

export default Dashboard;