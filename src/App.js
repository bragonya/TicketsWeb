import React from "react";
import {
  Route,
  Switch
} from "react-router-dom";

import  "./App.scss"
import SocketExample from "./socket_example"
import LandingPage from "./landingpage/landingpage"
import SeatReservationPage from './pages/seat-reservation/seat-reservation.component';
import HeaderMain from './components/header-main/header-main.component';

import {connect} from 'react-redux';

const  App = ({currentUser}) => {
  console.log(currentUser);
  return (
        <div>
          <HeaderMain/>
          <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route  path='/reservation' component={SeatReservationPage}/>
            <Route  path='/socket' component={SocketExample}/>
          </Switch>
        </div>
  );
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(App);