import React, {Component} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div>
            <div className="App">
                <FullCalendar  defaultView="dayGridMonth" plugins={[ dayGridPlugin ]}
                events={[
                    {title:'event 1', date: '2022-07-15'},
                    {title:'event 2', date: '2022-07-15'},
                    {title:'event 3', date: '2022-07-15'},
                    {title:'event 4', date: '2022-07-15'},
              
                    
                ]}

                
                
                />

            </div>
      </div>
    );
};

export default Dashboard;