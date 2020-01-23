import React from 'react';

import './iframe.styles.scss';
import Spinner from 'react-spinkit';
export default class IframeComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = { loading: true }
    }
    hideSpinner = (evt) => {
        this.setState({
          loading: false
        });
    }
    
    
    render() {
        const { props: { src, height, width }, state: { loading } } = this;
        return (
        <>   {loading?<div className='iframe-loader'><Spinner 
                            name='folding-cube' 
                            color="black"
                            fadeIn="none"
                        /></div>
                    :
                    null
                }
                <div className="embed-responsive embed-responsive-16by9">
                <iframe
                    key='iframe-FAC-Unbiased'
                    id='iframe-FAC' 
                    title="FAC Payment"
                    src={src} 
                    height={height} 
                    width={width}  
                    className='embed-responsive-item'
                    onLoad={this.hideSpinner}
                    frameBorder="0"
                    sandbox={`allow-popups allow-forms allow-scripts allow-same-origin`}
                />
                </div>
                
        </>
        )
  }
}
