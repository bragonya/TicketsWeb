import React from "react";
import {
  Route,
  Switch,
  Redirect
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
import AdminPage from './pages/admin-page/admin-page.component';

import { setSocket } from './redux/user/user.actions';
import { setStateSeat } from './redux/stage/stage.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCartItemsCount } from './redux/cart/cart.selectors';


import  "./App.scss"

let socket;

export class App extends React.Component{

  unsubscribeFromAuth = null;

  constructor(props){
    super(props);
    socket = io.connect("http://localhost:4001");
    socket.emit('connected',{},(initialStage)=>{
      initialStage.forEach(seat=>{
        setStateSeat(seat);
      });
    });
    
    const { setSocket, setStateSeat, setCurrentUser } = this.props;
    setSocket(socket);
    socket.on('newSeatModified',function(seat){
      setStateSeat(seat);
    });
    if(localStorage.getItem('user')) setCurrentUser(JSON.parse(localStorage.getItem('user')))
  }

  
  
  componentDidMount(){
    //const { setCurrentUser } = this.props;

    /*this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth=>{
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
      localStorage.setItem('user',JSON.stringify(userAuth));
    });*/
  }

  componentWillUnmount() {
    socket.disconnect();
    this.unsubscribeFromAuth();
    localStorage.removeItem('user');
  }

  render(){
    const { currentUser, cartItemsCount } = this.props;
    console.log(cartItemsCount);
    return (
      <div>
        <HeaderMain/>
        <Switch>
        <Route 
            exact 
            path="/" 
              render={() =>
              currentUser? (
              <Redirect to='/reservation'/>
              ):(
                <LandingPage/>
              )
            }
          />
          <Route  path='/reservation' component={SeatReservationPage}/>
          <Route  path='/socket' component={SocketExample}/>
          <Route  path='/admin' component={AdminPage}/>

          <Route 
            exact 
            path="/checkout" 
            render={() =>
              !cartItemsCount? (
                <Redirect to='/reservation'/>
                ):(
                  <CheckOutPage/>
                )
              }
          />

          <Route 
            exact 
            path="/signinsignup" 
            render={() =>
              currentUser? (
                <Redirect to='/reservation'/>
                ):(
                  <SignInSignUpPage/>
                )
              }
          />
          
        </Switch>
      </div>
      )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartItemsCount  : selectCartItemsCount
});

const mapDispatchToProps = dispatch => ({
  setSocket : socket => dispatch(setSocket(socket)),
  setStateSeat : seat => dispatch(setStateSeat(seat)),
  setCurrentUser : user => dispatch(setCurrentUser(user)),
});


export default connect(mapStateToProps,mapDispatchToProps)(App);