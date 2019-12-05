import React from 'react';

import './popover-generic.styles.scss';

class PopoverGeneric extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isPopoverOpen:false
        }
    }
    

    render(){
        const { state:{ isPopoverOpen }, props:{ children,colname,column } } = this;
        
        return(
            <React.Fragment>
                <div id='overlay' style={{display:!isPopoverOpen?'none':'inline-block'}}>
                    <div id="confirm" >
                        <div id='messagex'className="message">{`Liberar Asiento ${colname}-${column}`}</div><br/>
                        <p className='text-plain'>{`Para liberar asiento ingrese escriba el CODIGO: ${colname}-${column}`}</p>
                        <input type='text' />
                        <button id='noxx' className="noxx">Aceptar</button>
                        <button id='yesx' className="yes" onClick={ ()=> this.setState({ isPopoverOpen: !isPopoverOpen })} >Cancelar</button>
                    </div>
                </div>
                <div onClick={() => this.setState({ isPopoverOpen: !isPopoverOpen })}>
                    {children}  
                </div>
            </React.Fragment>
        )
    }
};

export default PopoverGeneric;