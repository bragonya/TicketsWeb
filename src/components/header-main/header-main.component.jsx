import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';


import { selectCartItemsCount, selectCartItems } from '../../redux/cart/cart.selectors';
import { selectCurrentUser, selectConexionSocket } from '../../redux/user/user.selectors';
import { selectSpeaker } from '../../redux/stage/stage.selectors';

import { setCurrentUser } from '../../redux/user/user.actions';
import { clearItemsCart } from '../../redux/cart/cart.actions';
import { setStateSeat, setSpeaker, setCourse, setOptionSigninSignup } from '../../redux/stage/stage.actions';

import { CONST_SEAT_STATES, CONST_SPEAKERS_ENUM } from '../../assets/constants';
import { getAmountSeatsOfCourse } from '../../redux/cart/cart.utils';

import './header-main.styles.scss';

class HeaderMain  extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  unlockAllSeats = () =>{
    const  { cartItems, clearItemsCart, setStateSeat, conexionSocket} = this.props;
    cartItems.forEach(item=>{
      setStateSeat({...item, estado:CONST_SEAT_STATES.free })
      conexionSocket.emit(
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

  collapseClick = () => {
    document.getElementById("menu-btn").checked = false;
  }

  render(){
    const { itemsCount, currentUser, history, setCurrentUser, conexionSocket, setCourse, setSpeaker, cartItems, speaker, setOptionSigninSignup } = this.props;
    let amount_KANO = getAmountSeatsOfCourse(cartItems,'KANO');
    let amount_KIM  = getAmountSeatsOfCourse(cartItems,'KIM');
    let conditionButtonShop = (speaker===CONST_SPEAKERS_ENUM.both? (amount_KANO===1 && amount_KIM===1): (itemsCount?true:false)) && window.location.pathname!=='/checkout';
    return(
      <div className="header-custom">
        
        <span  className="logo-custom" onClick={()=>{this.collapseClick(); history.push('/');}}></span>
        
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
        <ul className="menu">
          {currentUser?
            <li>
              <span className='nickname-user'>{currentUser?`Hola ${currentUser.firstname} `:''}</span>
            </li>
            :
            <li>
              <Link 
                to="/signinsignup" 
                className="btn btn-orange fadein"
                style={{maxWidth:'200px'}}
                onClick={() => { this.collapseClick(); setOptionSigninSignup(false);}}>
                Registrarme 
              </Link>
            </li>
            
          }
          <li >
            <Link to="/" onClick={() => { this.collapseClick(); }}>Inicio</Link>
          </li>
          {/*<li>
                <Link 
                      to="/reservation" 
                      onClick={() => { this.collapseClick(); }}>Reservacion</Link>
          </li>*/}
          <li>
              <Link to="/select"  onClick={() => { this.collapseClick(); }} >Seleccionar Curso</Link>
          </li>
          {currentUser?
            <React.Fragment>    
              {currentUser.admin?<li >
                <Link to="/report"  onClick={() => { this.collapseClick(); }} >Reporte</Link>
              </li>:null}
              {conditionButtonShop?
                <li>
                  <Link 
                        to="/checkout" 
                        className="btn btn-orange fadein buy-btn"
                        style={{maxWidth:'200px'}}
                        onClick={() => { this.collapseClick(); }}>
                        {currentUser.admin?"Reservar":"Comprar"}  
                  </Link>
                </li>:
                null
              }
              <li
                className="nav-item"
                onClick={ async ()=> { 
                    conexionSocket.emit('close-timer',{ user:localStorage.getItem('user')?{...JSON.parse(localStorage.getItem('user'))}:null });
                    conexionSocket.removeAllListeners('countdownStart');
                    await this.unlockAllSeats();
                    console.log('CERRANDO SESION ASIENTOS LIBERADOS');
                    await setCurrentUser(null); 
                    await setSpeaker(CONST_SPEAKERS_ENUM.kim);
                    await setCourse(CONST_SPEAKERS_ENUM.kim);
                    await localStorage.removeItem('user');
                    await localStorage.removeItem('speaker');
                    history.push('/reservation');
                  }
                }>
                <Link to="#" className="signout" style={{fontStyle:'italic'}} onClick={() => { this.collapseClick(); }}>CERRAR SESION</Link>
              </li>
            </React.Fragment>
            :
            null
          }
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  clearItemsCart: ()  => dispatch(clearItemsCart()),
  setStateSeat  : seat => dispatch(setStateSeat(seat)),
  setSpeaker    : speaker => dispatch(setSpeaker(speaker)),
  setCourse    : course => dispatch(setCourse(course)),
  setOptionSigninSignup : option => dispatch(setOptionSigninSignup(option)) 
});

const mapStateToProps = createStructuredSelector({
  itemsCount  : selectCartItemsCount,
  currentUser : selectCurrentUser,
  cartItems   : selectCartItems,
  conexionSocket: selectConexionSocket,
  speaker: selectSpeaker
});


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HeaderMain));