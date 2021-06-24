import React from 'react';
import NavBar from './components/NavBar.component';
import Appointment from './components/Appointment.component';
import Statics from './components/Statics.component';

export default function Home(): JSX.Element {
    return (
        <div className="form">
            {/* <div className="form"> */}
                <NavBar/>
                <div className="homePosterior">
                    <div className="home">
                        <div className="home">
                            <Statics/>
                        </div>
                        <div className="nextAppointment">
                            <h4>Próximas Citas</h4>
                            <p>Ver todas</p>
                        </div>
                        <Appointment/>
                        <Appointment/>
                        <Appointment/>
                    </div>
                </div>
            {/* </div> */}
        </div>
    )
}
