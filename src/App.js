import React from "react";
import {
  Route,
  Switch
} from "react-router-dom";
import io from "socket.io-client";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SocketExample from "./socket_example"
import LandingPage from "./landingpage/landingpage"
import SeatReservationPage from './pages/seat-reservation/seat-reservation.component';
import HeaderMain from './components/header-main/header-main.component';
import CheckOutPage from './pages/checkout-page/checkout-page.component';
import  SignInSignUpPage  from './pages/sign-in-sign-up-page/sign-in-sign-up-page.component';

import { auth, createUserProfileDocument } from './firebase/firebase.util';
import { setSocket } from './redux/user/user.actions';
import { setStateSeat } from './redux/stage/stage.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { setCurrentUser } from './redux/user/user.actions';

import  "./App.scss"

let socket;

export class App extends React.Component{

  unsubscribeFromAuth = null;

  constructor(props){
    super(props);
    socket = io.connect("http://localhost:4001");
    socket.emit('connected',{},(initialStage)=>{
      console.log(initialStage);
    });
    
    const { setSocket, setStateSeat } = this.props;
    setSocket(socket);
    socket.on('newSeatModified',function(seat){
      setStateSeat(seat);
    });
    var user = auth.currentUser;
    console.log(user);

  }

  componentDidMount(){
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth=>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot=>{
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    socket.disconnect();
    this.unsubscribeFromAuth();
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
          <Route  path='/checkout' component={CheckOutPage}/>
          <Route  path='/signinsignup' component={SignInSignUpPage}/>
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
  setStateSeat : seat => dispatch(setStateSeat(seat)),
  setCurrentUser : user => dispatch(setCurrentUser(user))
});


export default connect(mapStateToProps,mapDispatchToProps)(App);