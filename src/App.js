import React from "react";
import {
  Route,
  Switch
} from "react-router-dom";
import io from "socket.io-client";

import { setSocket } from './redux/user/user.actions';

import  "./App.scss"
import SocketExample from "./socket_example"
import LandingPage from "./landingpage/landingpage"
import SeatReservationPage from './pages/seat-reservation/seat-reservation.component';
import HeaderMain from './components/header-main/header-main.component';

import {connect} from 'react-redux';

let socket;

export class App extends React.Component{
  constructor(props){
    super(props);
    socket = io.connect("http://192.168.43.34:9000");
    socket.emit('conectado',{message:'Ha funcionado Perron'});
    this.props.setSocket(socket);
  }

  render(){
    const { currentUser } = this.props;
    return (
      <div>
        <HeaderMain/>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route  path='/reservation' component={SeatReservationPage}/>
          <Route  path='/socket' component={SocketExample}/>
        </Switch>
      </div>
      )
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setSocket: socket => dispatch(setSocket(socket))
});


export default connect(mapStateToProps,mapDispatchToProps)(App);