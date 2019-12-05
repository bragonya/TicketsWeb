import React from 'react';
import { Link } from 'react-router-dom';
const HeaderMain = () =>(
    <nav className="navbar navbar-expand-md fixed-top">
    <div className="row navbar-wrapper">
      <button id = "toogleButton" className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/" className="nav-link" onClick={() => collapseClick()}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={() => collapseClick()}>About</Link>
          </li>
          <li className="nav-item">
            <Link to="/users" className="nav-link" onClick={() => collapseClick()}>Users</Link>
          </li>
          <li className="nav-item">
            <Link to="/reservation" className="nav-link" onClick={() => collapseClick()}>Reservation</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link btn btn-orange" onClick={() => collapseClick()}>Registro</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

const collapseClick = () => {
  document.getElementById("toogleButton").click();
}

export default HeaderMain;