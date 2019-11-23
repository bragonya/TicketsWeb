import React from "react";
import AwesomeSlider from 'react-awesome-slider';
import AwsSliderStyles from 'react-awesome-slider/dist/styles.css';


class Gallery extends React.Component {
    render() {
        return (
            <div className="section container mt-3">
                <h2>Galería</h2>
                <div className="container">
                    <AwesomeSlider cssModule={AwsSliderStyles}>
                        <div data-src="/img/header_bg.jpg" />
                        <div data-src="/img/header_bg2.jpg" />
                        <div data-src="/img/header_bg3.jpg" />
                    </AwesomeSlider>
                </div>
            </div >
        );
    }
}


export default Gallery;