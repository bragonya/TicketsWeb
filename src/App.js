import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { } from "./App.scss"

import LandingPage from "./landingpage/landingpage"

export default function App() {
  return (
    <Router>
      <div>
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
              </ul>
              <Link to="/register" className="btn btn-orange">Registro</Link>
            </div>
          </div>
        </nav>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/pricing">
            <Pricing />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <Link to="/about">Acerca de</Link>
                <Link to="/pricing">Precios</Link>
                <Link>© Copyright. All Rights Reserved 2019.</Link>
              </div>
            </div>
          </div>
        </footer >
      </div>
    </Router>
  );
}

function Home() {
  return <LandingPage></LandingPage>
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
function Register() {
  return <h2>Registro</h2>;
}
function Pricing() {
  return <h2>Pricing</h2>;
}