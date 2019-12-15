import React from 'react';


import './legend-prices.styles.scss';

const LegendPrices = () => (
    <div className='legend-prices'>
        <div className='row'>
            <div className='col-auto custom'>
                <div className='name'>
                        LOUNGE: Q1800
                </div>    
                <div className='name'>
                        VIP: Q1600
                </div>    
                <div className='name'>
                        PROFESIONAL: Q1450
                </div>
                {/*<div className='name'>
                        ESTUDIANTE: Q750
</div>*/}
            </div>
        </div>
    </div>
);

export default LegendPrices;