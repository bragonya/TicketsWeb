import React from "react";
import {
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { withRouter } from 'react-router-dom';

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
import SelectCoursePage from './pages/select-course-page/select-course-page.component';
import PaymentSuccess from './pages/payment-success/payment-success.component';

import { setSocket, setCurrentUser } from './redux/user/user.actions';
import { setStateSeat, setClockTime } from './redux/stage/stage.actions';
import { clearItemsCart } from './redux/cart/cart.actions';

import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCartItemsCount, selectCartItems } from './redux/cart/cart.selectors';

import { CONST_SEAT_STATES } from './assets/constants';

import  "./App.scss"

let socket;

export class App extends React.Component{

  unsubscribeFromAuth = null;

  constructor(props){
    super(props);
    socket = io.connect("http://localhost:4001",{
      secure: true
    });
    
    const { setSocket, setStateSeat, setCurrentUser } = this.props;    
    setSocket(socket);
    socket.emit('connected',{},(initialStage)=>{
      initialStage.forEach(seat=>{
        console.log(seat);
        setStateSeat(seat);
      });
    });

    socket.on('newSeatModified',function(seat){
      setStateSeat(seat);
    });
    if(localStorage.getItem('user')) setCurrentUser(JSON.parse(localStorage.getItem('user')));
  }

  

  unlockAllSeats = () =>{
    const  { clearItemsCart, setStateSeat } = this.props;    
    var    { cartItems } = this.props;
    cartItems=cartItems.length? cartItems: JSON.parse(localStorage.getItem('cartItems')) || [] 
    cartItems.forEach(item=>{
      setStateSeat({...item, estado:CONST_SEAT_STATES.free })
      socket.emit(
        'seatModified',
        {   ...item,
          estado:CONST_SEAT_STATES.free
        },()=>{}
      );
    });
    clearItemsCart();
    localStorage.removeItem('cartItems');
  }

  componentDidMount(){
    const { setClockTime, history } = this.props;    
    if (window.performance) {
      if (performance.navigation.type === 1) {
        if((window.location.pathname==='/reservation' || window.location.pathname==='/checkout') && localStorage.getItem('user')){
          this.unlockAllSeats();
          socket.removeAllListeners('countdownStart');
          socket.on('countdownStart',function(time){
            setClockTime(time);
          });
          socket.emit('close-timer','');
          socket.emit('countdownStart',{},(clockFinishMessage)=>{
            this.unlockAllSeats();
            socket.removeAllListeners('countdownStart');
            history.push('/reservation');
          });
        }else{
          if(!(window.location.pathname==='/checkout')){
            this.unlockAllSeats();
          }
          socket.emit('close-timer','');
          socket.removeAllListeners('countdownStart');
        }
      }
    }
    
    history.listen((location, action) => {
      if((location.pathname==='/reservation' || location.pathname==='/checkout') && localStorage.getItem('user')){
        if(!(location.pathname==='/checkout')){
          this.unlockAllSeats();
        }
        socket.removeAllListeners('countdownStart');
        socket.on('countdownStart',function(time){
          setClockTime(time);
        });
        socket.emit('close-timer','');
        socket.emit('countdownStart',{},(clockFinishMessage)=>{
          this.unlockAllSeats();
          socket.removeAllListeners('countdownStart');
          history.push('/reservation');
        });
        
      }else{
        if(!(location.pathname==='/checkout')){
          this.unlockAllSeats();
        }
        socket.emit('close-timer','');
        socket.removeAllListeners('countdownStart');
      }
    });
  }

  componentWillUnmount() {
    socket.disconnect();
    this.unsubscribeFromAuth();
    localStorage.removeItem('user');
    localStorage.removeItem('cartItems');
  }

  render(){
    const { currentUser, cartItemsCount } = this.props;
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

          <Route  path='/reservation' render={()=>{   
                                                  return <SeatReservationPage/>
                                              }}
            />
          <Route  path='/socket' component={SocketExample}/>
          <Route  path='/admin' component={AdminPage}/>
          <Route  path='/select' component={SelectCoursePage}/>
          <Route  path='/paymentsuccess' component={PaymentSuccess}/>
          <Route 
            exact 
            path="/checkout" 
            render={() =>{
                  
                  return !cartItemsCount? (
                  <Redirect to='/reservation'/>
                  ):(
                    <CheckOutPage/>
                  )
                }
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
  cartItemsCount  : selectCartItemsCount,
  cartItems   : selectCartItems
});

const mapDispatchToProps = dispatch => ({
  setSocket : socket => dispatch(setSocket(socket)),
  setStateSeat : seat => dispatch(setStateSeat(seat)),
  setCurrentUser : user => dispatch(setCurrentUser(user)),
  clearItemsCart: ()  => dispatch(clearItemsCart()),
  setClockTime:     time => dispatch(setClockTime(time))
});


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));