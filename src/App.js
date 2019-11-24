import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { } from "./App.scss"

import LandingPage from "./landingpage/landingpage"
import MainStage from "./components/main-stage/main-stage.component";


export default function App() {
  return (
    <MainStage
      onSelectSeat={seatId => {
        console.log("selected - " + seatId);
      }}
    />)
    
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