import React from "react";
import NavBarCustom  from '../components/nav-bar-custom/nav-bar-custom.component';

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import './gallery.scss';
const imagesbyYear = {
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
  };

  const years =[
    {
        label:'2012',
    },
    {
        label:'2013',
    },
    {
        label:'2014',
    }
  ];

  
class Gallery extends React.Component {
    state={
        currentYear:'2012'
    }
    handleSelectYear = (year)=>{
        this.setState({ currentYear : year });
    }

    render() {
        const  { currentYear } = this.state;
        return (
            <div className="section container">
                <h2>Galería</h2>
                    <div className='row no-gutters'>
                        <div className='col-auto col-nav-bar-custom'>
                            <NavBarCustom 
                                items={years} 
                                handleSelectYear={this.handleSelectYear}
                                defaultYear = {currentYear}
                                
                            />
                        </div>
                        <div className='col'>
                            <ImageGallery 
                                items={imagesbyYear[currentYear]}  
                                showBullets={true}
                                thumbnailPosition = {'right'}
                                //slideOnThumbnailOver = {false}
                                lazyLoad = {true}
                            /> 
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