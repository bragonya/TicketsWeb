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

  render(){
    const { itemsCount, currentUser, history, setCurrentUser } = this.props;
    return(
    <nav className="navbar navbar-expand-md fixed-top">
    <div className="row navbar-wrapper">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto">
          
          {!currentUser?
            <li className="nav-item active">
              <Link to="/" className="nav-link" onClick={() => collapseClick()}>Inicio</Link>
            </li>:null
          }
          <li className="nav-item">
                <Link 
                      to="/reservation" 
                      className="nav-link"
                      onClick={() => collapseClick()}>Reservacion</Link>
          </li>
          {currentUser?
            <React.Fragment>    
              
              <li className="nav-item">
                <Link to="/about" className="nav-link" onClick={() => collapseClick()} >Sobre</Link>
              </li>
              {itemsCount?
                <li className="nav-item" >
                  <Link 
                        to="/checkout" 
                        className="nav-link btn btn-orange fadein"
                        onClick={() => collapseClick()}>Comprar</Link>
                </li>:
                null
              }
              <div 
                className="nav-item"
                onClick={()=> 
                  { 
                    this.unlockAllSeats();
                    setCurrentUser(null); 
                    localStorage.removeItem('user');
                    history.push('/reservation');
                  }
                }>
                <Link to="#" className="nav-link" style={{fontStyle:'italic'}} onClick={() => collapseClick()}>CERRAR SESION</Link>
              </div>
            </React.Fragment>
            :
            null
          }
        </ul>
      </div>
    </div>
  </nav>
)}}

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


const collapseClick = () => {
  document.getElementById("toogleButton").click();
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HeaderMain));