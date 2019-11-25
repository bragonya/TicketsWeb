import React from 'react';


import './legend-croquis.styles.scss';

const LegendCroquis = () =>(
    <div className="rowX">
        <div className='circle free'>
            Free
        </div>
        <div className='circle sold'>
            Sold
        </div>
        <div className='circle blocked'>
            Blocked
        </div>
    </div>
);

export default LegendCroquis;