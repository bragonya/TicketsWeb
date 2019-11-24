import React from "react";
import {
  Route,
  Switch
} from "react-router-dom";

import  "./App.scss"

import LandingPage from "./landingpage/landingpage"
import SeatReservationPage from './pages/seat-reservation/seat-reservation.component';
import HeaderMain from './components/header-main/header-main.component';

export default function App() {
  return (
        <div>
          <HeaderMain/>
          <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route  path='/reservation' component={SeatReservationPage}/>
          </Switch>
        </div>
  );
}