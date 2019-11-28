import React from 'react';
import { Link } from 'react-router-dom';
const HeaderMain = () =>(
    <nav className="navbar navbar-expand-md fixed-top">
    <div className="row navbar-wrapper">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/users" className="nav-link">Users</Link>
          </li>
          <li className="nav-item">
            <Link to="/reservation" className="nav-link">Reservation</Link>
          </li>
        </ul>
        <Link to="/register" className="btn btn-orange">Registro</Link>
      </div>
    </div>
  </nav>
);

export default HeaderMain;