import React from "react";
import './video.scss';
class Video extends React.Component {
    
    render() {
        return (
            <div class="section text-align--center">  
            <h2>¡Bienvenidos a Unbiased 2020!</h2>
            <br></br>
            <div class="video-container">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/kBsj8C7bGs8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            </div>
        );
    }
}


export default Video;


