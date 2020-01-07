import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentCourse, selectSpeaker } from '../../redux/stage/stage.selectors';

import  { CONST_SPEAKERS_ENUM, CONST_PRICES } from '../../assets/constants';


import './legend-prices.styles.scss';

const LegendPrices = ({ currentCourse , speaker}) => {
    const { LOUNGE,VIP,PROFESIONAL,ESTUDIANTE } =  CONST_PRICES[currentCourse]['only'];
    return(
        <div className='legend-prices'>
            <div className='row'>
                <div className='col-auto custom'>
                    <div className='name'>
                            LOUNGE: Q{LOUNGE.PRICE}
                    </div>    
                    <div className='name'>
                            VIP: Q{VIP.PRICE}
                    </div>    
                    <div className='name'>
                            PROFESIONAL: Q{PROFESIONAL.PRICE}
                    </div>
                    { currentCourse===CONST_SPEAKERS_ENUM.kano? <div className='name'>
                            ESTUDIANTE: Q{ESTUDIANTE.PRICE}
                        </div>:null
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentCourse: selectCurrentCourse,
    speaker : selectSpeaker
});

export default connect(mapStateToProps)(LegendPrices);