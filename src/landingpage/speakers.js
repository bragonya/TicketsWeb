import React from "react";
import './speakers.scss';
import Speaker from './speaker.js'
import './speakers.scss';
var imgKano = require(`../assets/avatar/kanoavatar.jpeg`)
var imgConejo = require(`../assets/avatar/conejoavatar.jpeg`)
var imgKim = require(`../assets/avatar/kimavatar.jpeg`)
class Speakers extends React.Component {
    
    render() {
        return (
            <div class="section text-align--center">
                <h2>Conoce a los speakers 🎤</h2>
                <div class="content content--tall ">
                <Speaker description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer " image = {imgKano} name ="Dr. Paulo Kano" tag="Desarrollador del Método Cllones."/>
                <Speaker description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer " image = {imgKim} name ="Dr. Syngcuk Kim" tag="PhD en Fisiología MIcrocirculatoria."/>
                <Speaker description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer " image = {imgConejo} name ="Dr. Julián Conejo" tag="Director Clínico de CAD/CAM de la Universidad de Pennsylvania."/>
            </div>
            </div>
        );
    }
}


export default Speakers;