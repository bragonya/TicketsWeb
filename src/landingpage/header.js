import React from "react";
class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="background bg-3" alt="Photo by The Climate Reality Project on Unsplash"></div>
                <div className="logo">
                    <h1>Odonto MeetUp</h1>
                    <h2>THE PEOPLES WEB DESIGN CONFERINCE</h2>
                </div>
                <div className="event-info">
                    <ul class="small-block-grid-1 medium-block-grid-2 large-block-grid-4">
                        <li>
                            <i class="fa fa-map-marker "></i>London, England
						</li>
                        <li>
                            <i class="fa fa-calendar"></i>25/08/2020
						</li>
                        <li>
                            <i class="fa fa-microphone"></i>8 Speakers
						</li>
                        <li>
                            <i class="fa fa-ticket"></i>107 tickets left
						</li>
                    </ul>
                    <h1>3 days of inspiration and education on user experience.</h1>
                    <h2>On April 23rd 2014 in Newcastle upon Tyne, UK, Industry is back with another carefully curated selection of talks. <br /> 8 Speakers will provide insights in to their work and offer ways to make us all better at what we do.</h2>
                </div>

            </div>
        );
    }
}


export default Header;