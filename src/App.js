import React from "react";
import {
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

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
import { setStateSeat, setClockTime, setSpeaker, setCourse } from './redux/stage/stage.actions';
import { clearItemsCart } from './redux/cart/cart.actions';

import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCartItemsCount, selectCartItems } from './redux/cart/cart.selectors';

import { CONST_SEAT_STATES, CONST_SPEAKERS_ENUM } from './assets/constants';

import  "./App.scss"

let socket;
let initialState={
  loading: true
};
export class App extends React.Component{

  unsubscribeFromAuth = null;
  constructor(props){
    super(props);
    this.state  = { ...initialState };
    if (process.env.NODE_ENV === 'development') {
      socket = io.connect(process.env.REACT_APP_SOCKET_URL);
    }else {
      socket = io.connect(process.env.REACT_APP_SOCKET_URL,{
        secure: true
      });
    }
    socket.emit('connected',{ user:localStorage.getItem('user')?{...JSON.parse(localStorage.getItem('user'))}:null },(initialStage)=>{
      console.log('emit connected');
      initialStage.forEach(seat=>{
        console.log(seat);
        setStateSeat(seat);
      });
      this.setState({ loading: false });
    });  
    const { setSocket, setStateSeat, setCurrentUser, setSpeaker, setCourse } = this.props;    
    setSocket(socket);
    
    socket.on('newSeatModified',function(seat){
      console.log(seat);
      setStateSeat(seat);
    });
    if(localStorage.getItem('user')) setCurrentUser(JSON.parse(localStorage.getItem('user')));
    if(localStorage.getItem('speaker')){
      let speakerLocal = JSON.parse(localStorage.getItem('speaker'));
      setSpeaker(speakerLocal.speaker);
      setCourse(
        speakerLocal.speaker===CONST_SPEAKERS_ENUM.both?
        CONST_SPEAKERS_ENUM.kim
        :speakerLocal.speaker);
    }
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
          estado:CONST_SEAT_STATES.free,
          user:localStorage.getItem('user')?{...JSON.parse(localStorage.getItem('user'))}:null
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
          if(JSON.parse(localStorage.getItem('user')).admin) return;//if admin then not timer
          socket.removeAllListeners('countdownStart');
          socket.on('countdownStart',function(time){
            setClockTime(time);
          });
          socket.emit('close-timer',{ user:localStorage.getItem('user')?{...JSON.parse(localStorage.getItem('user'))}:null });
          socket.emit('countdownStart',{ user:localStorage.getItem('user')?{...JSON.parse(localStorage.getItem('user'))}:null },(clockFinishMessage)=>{
            this.unlockAllSeats();
            socket.removeAllListeners('countdownStart');
            history.push('/reservation');
          });
        }else{
          if(!(window.location.pathname==='/checkout')){
            this.unlockAllSeats();
          }
          socket.emit('close-timer',{ user:localStorage.getItem('user')?{...JSON.parse(localStorage.getItem('user'))}:null });
          socket.removeAllListeners('countdownStart');
        }
      }
    }

    history.listen((location, action) => {
      if((location.pathname==='/reservation' || location.pathname==='/checkout') && localStorage.getItem('user')){
        if(!(location.pathname==='/checkout')){
          this.unlockAllSeats();
        }
        if(!(JSON.parse(localStorage.getItem('user')).admin)){
          socket.removeAllListeners('countdownStart');
          socket.on('countdownStart',function(time){
            setClockTime(time);
          });
          socket.emit('close-timer',{ user:localStorage.getItem('user')?{...JSON.parse(localStorage.getItem('user'))}:null });
          socket.emit('countdownStart',{ user:localStorage.getItem('user')?{...JSON.parse(localStorage.getItem('user'))}:null },(clockFinishMessage)=>{
            this.unlockAllSeats();
            socket.removeAllListeners('countdownStart');
            history.push('/reservation');
          });
        }
      }else{
        if(!(location.pathname==='/checkout')){
          this.unlockAllSeats();
        }
        socket.emit('close-timer',{ user:localStorage.getItem('user')?{...JSON.parse(localStorage.getItem('user'))}:null });
        socket.removeAllListeners('countdownStart');
      }
      window.scrollTo(0, 0);
    });
  }

  
  

  componentWillUnmount() {
    this.unlisten();
    socket.disconnect();
    this.unsubscribeFromAuth();
    localStorage.removeItem('user');
    localStorage.removeItem('cartItems');
  }

  render(){
    const { props:{currentUser, cartItemsCount}, state:{loading}  } = this;
    
    return (
      <div >
        {loading?(<div style={{marginTop:'20%',width:'100%',textAlign:'center'}}>
            <Loader
                type="TailSpin"
                color="#00BFFF"
                height={100}
                width={100}
            /></div>):
        <React.Fragment>
          <HeaderMain/>
          <Switch>
          <Route 
              exact 
              path="/" 
              component={LandingPage}
            />

            <Route  path='/reservation' render={()=>{   
                                                    return <SeatReservationPage/>
                                                }}
              />
            <Route  path='/socket' component={SocketExample}/>
            <Route  path='/report' render={()=>{
                      if(currentUser){
                        if(currentUser.admin){
                          return <AdminPage/>
                        }
                      }
                      return (<Redirect to='/reservation'/>)
              }}/>
            <Route  path='/select' render={() =>
                currentUser? (
                <SelectCoursePage/>
                ):(
                  <Redirect to='/reservation'/>
                )}
              />
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
          </React.Fragment>}
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
  setClockTime:     time => dispatch(setClockTime(time)),
  setSpeaker : speaker => dispatch(setSpeaker(speaker)),
  setCourse  : course => dispatch(setCourse(course))
});


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));