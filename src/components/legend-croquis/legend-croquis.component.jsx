import React from 'react';


import './legend-croquis.styles.scss';

const LegendCroquis = () =>(
    
    <div className="rowX">
        <div className='circle free'>
            Libre
        </div>
        <div className='circle sold'>
            Vendido
        </div>
        <div className='circle blocked'>
            Bloqueado
        </div>
    </div>
);

export default LegendCroquis;