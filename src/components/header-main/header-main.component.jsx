import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import './header-main.styles.scss';

const HeaderMain = ({itemsCount}) =>(
    <nav className="navbar navbar-expand-md fixed-top">
    <div className="row navbar-wrapper">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/" className="nav-link">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">Sobre</Link>
          </li>
          <li className="nav-item">
            <Link to="/users" className="nav-link">Usuarios</Link>
          </li>
          <li className="nav-item">
            <Link to="/reservation" className="nav-link">Reservacion</Link>
          </li>

          {itemsCount?
              <li className="nav-item ">
               <Link to="/checkout" className="nav-link btn btn-orange fadein">Comprar</Link>
             </li>:null 
          }
          
        </ul>
      </div>
    </div>
  </nav>
);

const mapStateToProps = createStructuredSelector({
  itemsCount : selectCartItemsCount
});

export default connect(mapStateToProps)(HeaderMain);