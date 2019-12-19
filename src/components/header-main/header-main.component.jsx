import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';


import { selectCartItemsCount, selectCartItems } from '../../redux/cart/cart.selectors';
import { selectCurrentUser, selectConexionSocket } from '../../redux/user/user.selectors';

import { setCurrentUser } from '../../redux/user/user.actions';
import { clearItemsCart } from '../../redux/cart/cart.actions';
import { setStateSeat } from '../../redux/stage/stage.actions';

import { CONST_SEAT_STATES } from '../../assets/constants';

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
          estado:CONST_SEAT_STATES.free
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
    const { itemsCount, currentUser, history, setCurrentUser, conexionSocket } = this.props;
    return(
      <div className="header-custom">
        <span   className="logo-custom"></span>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
        <ul className="menu">
        {!currentUser?
            <li >
              <Link to="/" onClick={() => { this.collapseClick(); }}>Inicio</Link>
            </li>:null
          }
          <li>
                <Link 
                      to="/reservation" 
                      onClick={() => { this.collapseClick(); }}>Reservacion</Link>
          </li>
          {currentUser?
            <React.Fragment>    
              <li >
                <Link to="/select"  onClick={() => { this.collapseClick(); }} >Seleccionar Curso</Link>
              </li>
              {currentUser.admin?<li >
                <Link to="/about"  onClick={() => { this.collapseClick(); }} >Reporte</Link>
              </li>:null}
              {itemsCount?
                <li>
                  <Link 
                        to="/checkout" 
                        className="btn btn-orange fadein"
                        style={{maxWidth:'200px'}}
                        onClick={() => { this.collapseClick(); }}>Comprar</Link>
                </li>:
                null
              }
              <li
                className="nav-item"
                onClick={()=> 
                  { 
                    conexionSocket.emit('close-timer','');
                    conexionSocket.removeAllListeners('countdownStart');
                    this.unlockAllSeats();
                    setCurrentUser(null); 
                    localStorage.removeItem('user');
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
  setStateSeat  : seat => dispatch(setStateSeat(seat))
});

const mapStateToProps = createStructuredSelector({
  itemsCount  : selectCartItemsCount,
  currentUser : selectCurrentUser,
  cartItems   : selectCartItems,
  conexionSocket: selectConexionSocket
});


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HeaderMain));