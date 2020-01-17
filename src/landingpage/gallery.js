import React from "react";
import NavBarCustom  from '../components/nav-bar-custom/nav-bar-custom.component';


import AwesomeSlider from 'react-awesome-slider';
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/fold-out-animation';

 

import './gallery.scss';

/*const imagesbyYear = {
    '2012':[
        {
            original: 'https://picsum.photos/id/1018/1000/550/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
                original: 'https://picsum.photos/id/100/1000/550',
                thumbnail: 'https://picsum.photos/id/100/250/150/',
        }
    ],
    '2013':[
        {
            original: 'https://picsum.photos/id/1015/1000/550/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
        }
        ],
    '2014':
    [
        {
            original: 'https://picsum.photos/id/1019/1000/550/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
        }
    ],
  };*/

  const imagesbyYear = {
    'Dr.Kim':
    [
        <div key='Dr.Kim-0' data-src={require("../assets/brochures/kim/1d5e3950-2860-48c2-99e9-f15e0f6400dd.jpeg")} />,
        <div key='Dr.Kim-1' data-src={require("../assets/brochures/kim/3c3dc835-28cf-46bd-9891-6d90832f5d7c.jpeg")} />,
        <div key='Dr.Kim-2' data-src={require("../assets/brochures/kim/42ea8350-d1f4-4b36-9f34-9011a84650c9.jpeg")} />,
        <div key='Dr.Kim-3' data-src={require("../assets/brochures/kim/b6d80d64-c716-4a7d-ae2b-e66a9f275b5a.jpeg")} />,
        <div key='Dr.Kim-4' data-src={require("../assets/brochures/kim/c45c3155-5da3-4002-a0ac-5e20b4885630.jpeg")} />,
        <div key='Dr.Kim-5' data-src={require("../assets/brochures/kim/f152cdaa-a775-40dd-aaf2-a2723c116a5f.jpeg")} />
    ],
    'Dr.Kano':
    [
        <div key='Dr.Kano-1' data-src={require("../assets/brochures/kano/3cee19b7-31af-461f-bdd7-7ebb056fadd1.jpeg")} />,
        <div key='Dr.Kano-2' data-src={require("../assets/brochures/kano/714b1e9f-336c-4694-805f-1e1ecadc160c.jpeg")} />,
        <div key='Dr.Kano-3' data-src={require("../assets/brochures/kano/a842f835-c26e-4e4d-88e1-1f0cc7a7e1c6.jpeg")} />,
        <div key='Dr.Kano-4' data-src={require("../assets/brochures/kano/e6653c10-a133-4727-9b58-0155a190378b.jpeg")} />,   
        <div key='Dr.Kano-5' data-src={require("../assets/brochures/kano/f152cdaa-a775-40dd-aaf2-a2723c116a5f.jpeg")} />,    
    ]
  };
  
  
  
  
const years =[
    {
        label:'Dr.Kim',
    },
    {
        label:'Dr.Kano',
    }
  ];

  
class Gallery extends React.Component {
    state={
        currentYear:'Dr.Kim'
    }
    handleSelectYear = (year)=>{
        this.setState({ currentYear : year });
    }

    render() {
        const  { currentYear } = this.state;
        return (
            <div className="section container">
                <h2>Brochures</h2>
                    <div className='row'>
                        <div className='col-auto col-nav-bar-custom'>
                                <NavBarCustom 
                                    items={years} 
                                    handleSelectYear={this.handleSelectYear}
                                    defaultYear = {currentYear}
                                />
                        </div>    
                        <div className='col'>
                            <AwesomeSlider animation="foldOutAnimation" cssModule={AwesomeSliderStyles}>
                                {imagesbyYear[currentYear]}
                            </AwesomeSlider>
                            {/*<ImageGallery 
                                items={imagesbyYear[currentYear]}  
                                showBullets={true}
                                thumbnailPosition = {'right'}
                                slideOnThumbnailOver = {true}
                                lazyLoad = {true}
                            />*/} 
                        </div>
                    </div>
            </div>            
        );
    }
}


export default Gallery;

/*<div className="section container mt-3">
                <h2>Galería</h2>
                <div className="container">
                    <AwesomeSlider cssModule={AwsSliderStyles}>
                        <div data-src="/img/header_bg.jpg" />
                        <div data-src="/img/header_bg2.jpg" />
                        <div data-src="/img/header_bg3.jpg" />
                    </AwesomeSlider>
                </div>
</div >*/