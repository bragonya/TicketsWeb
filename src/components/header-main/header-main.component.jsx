import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { auth } from '../../firebase/firebase.util';
import { clearItemsCart } from '../../redux/cart/cart.actions';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { setStateSeat } from '../../redux/stage/stage.actions';
import { CONST_SEAT_STATES } from '../../assets/constants';

import './header-main.styles.scss';

const HeaderMain = ({ itemsCount, currentUser, dispatch, history, cartItems }) =>(
    <nav className="navbar navbar-expand-md fixed-top">
    <div className="row navbar-wrapper">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto">
          
          {!currentUser?
            <li className="nav-item active">
              <Link to="/" className="nav-link">Inicio</Link>
            </li>:null
          }
          <li className="nav-item">
                <Link to="/reservation" className="nav-link">Reservacion</Link>
          </li>
          {currentUser?
            <React.Fragment>    
              
              <li className="nav-item">
                <Link to="/about" className="nav-link">Sobre</Link>
              </li>
              {itemsCount?
                <li className="nav-item ">
                  <Link to="/checkout" className="nav-link btn btn-orange fadein">Comprar</Link>
                </li>:
                null
              }
              <div 
                className="nav-item"
                onClick={()=> 
                  { 
                    auth.signOut(); 
                    cartItems.map(item=>{
                        dispatch(setStateSeat({...item, estado:CONST_SEAT_STATES.free }))
                    });
                    dispatch(clearItemsCart());  
                    history.push('/reservation');
                  }
                }>
                <Link to="#" className="nav-link" style={{fontStyle:'italic'}}>SIGN OUT</Link>
              </div>
            </React.Fragment>
            :
            null
          }
        </ul>
      </div>
    </div>
  </nav>
);

const mapStateToProps = createStructuredSelector({
  itemsCount  : selectCartItemsCount,
  currentUser : selectCurrentUser,
  cartItems   : selectCartItems
});



export default withRouter(connect(mapStateToProps)(HeaderMain));