import React, {Component} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const Dashboard = () => {
    return (
        <div>
            <div className="App" style={{width:'100%' , height:'100%'}}>
                <FullCalendar  defaultView="dayGridMonth" plugins={[ dayGridPlugin ]}
                events={[
                    {title:'event 1', date: '2022-07-15'}
                ]}

                
                
                />

            </div>
      </div>
    );
};

export default Dashboard;