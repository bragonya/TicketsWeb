import React from 'react';


import './legend-prices.styles.scss';

const LegendPrices = () => (
    <div className='legend-prices'>
        <div className='row'>
            <div className='col-auto'>
                <div className='name'>
                        LOUNGE: Q6000
                </div>    
                <div className='name'>
                        VIP: Q5000
                </div>    
                <div className='name'>
                        PROFESIONAL: Q4000
                </div>
                <div className='name'>
                        ESTUDIANTE:Q3000
                </div>
            </div>
        </div>
    </div>
);

export default LegendPrices;