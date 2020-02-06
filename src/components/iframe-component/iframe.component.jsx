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
    iframeURLChange = (iframe, callback) =>{
        var lastDispatched = null;
    
        var dispatchChange = function () {
            var newHref = iframe.contentWindow.location.href;
    
            if (newHref !== lastDispatched) {
                callback(newHref);
                lastDispatched = newHref;
            }
        };
    
        var unloadHandler = function () {
            // Timeout needed because the URL changes immediately after
            // the `unload` event is dispatched.
            setTimeout(dispatchChange, 0);
        };
    
        function attachUnload() {
            // Remove the unloadHandler in case it was already attached.
            // Otherwise, there will be two handlers, which is unnecessary.
            iframe.contentWindow.removeEventListener("unload", unloadHandler);
            iframe.contentWindow.addEventListener("unload", unloadHandler);
        }
    
        iframe.addEventListener("load", function () {
            attachUnload();
    
            // Just in case the change wasn't dispatched during the unload event...
            dispatchChange();
        });
    
        attachUnload();
    }

    componentDidMount(){
        this.iframeURLChange(document.getElementById("iframe-FAC"), function (newURL) {
            console.log("URL changed:", newURL);
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
                <iframe     
                    key='iframe-FAC-Unbiased'
                    id='iframe-FAC' 
                    title="FAC Payment"
                    src={src} 
                    height={height} 
                    width={width}  
                    className='iframe-payment'
                    onLoad={this.hideSpinner}
                    frameBorder="0"
                    sandbox={`allow-popups allow-forms allow-scripts allow-same-origin`}
                />
        </>
        )
  }
}
