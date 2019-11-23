import React from "react";
import Header from "./header";
import Coursesinfo from "./courses-info";
import CTA from "./cta";
import MissionVision from "./mission-vision";
import Gallery from "./gallery";
import Contact from "./contact";

class LandingPage extends React.Component {
    render() {
        return (
            <main role="main" class="landingpage">
                <Header></Header>
                <Coursesinfo></Coursesinfo>
                <CTA></CTA>
                <MissionVision></MissionVision>
                <Gallery></Gallery>
                <CTA></CTA>
                <Contact></Contact>
            </main>
        );
    }
}


export default LandingPage;