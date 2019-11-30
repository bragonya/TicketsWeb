import React from "react";
import {
  Route,
  Switch
} from "react-router-dom";
import io from "socket.io-client";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import  "./App.scss"
import SocketExample from "./socket_example"
import LandingPage from "./landingpage/landingpage"
import SeatReservationPage from './pages/seat-reservation/seat-reservation.component';
import HeaderMain from './components/header-main/header-main.component';


import { setSocket } from './redux/user/user.actions';
import { setStateSeat } from './redux/stage/stage.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

let socket;

export class App extends React.Component{
  constructor(props){
    super(props);
    socket = io.connect("http://192.168.1.36:9000");
    socket.emit('conectado',{message:'Ha funcionado Perron'});
    
    const { setSocket, setStateSeat } = this.props;
    setSocket(socket);
    socket.on('newSeatModified',function(seat){
      setStateSeat(seat);
    });
  }

  componentWillUnmount() {
    socket.disconnect()
    console.log("Disconnecting Socket as component will unmount");
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

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setSocket : socket => dispatch(setSocket(socket)),
  setStateSeat : seat => dispatch(setStateSeat(seat))
});


export default connect(mapStateToProps,mapDispatchToProps)(App);