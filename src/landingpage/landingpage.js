import React from "react";
import { Suspense, lazy } from 'react';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


import Header from "./header";
import Video from "./video";
import Speakers from "./speakers"
import Coursesinfo from "./courses-info";
//import MissionVision from "./mission-vision";

import Contact from "./contact";

const Gallery = lazy(() => import('./gallery'));

class LandingPage extends React.Component {
    render() {
        return (
            <main role="main" className="landingpage">
                <Header></Header>
                <Video></Video>
                <Coursesinfo></Coursesinfo>
                <Speakers></Speakers>
               <Suspense 
                    fallback={
                        <div style={{width:'100%', /*marginTop:'20%',*/ alignSelf:'center'}}>
                            <Loader
                                type="Grid"
                                color="#00BFFF"
                                height={150}
                                width={150}
                            />
                        </div>}
                    >
                        <Gallery/>
                </Suspense>
                <Contact></Contact>
            </main>
        );
    }
}


export default LandingPage;