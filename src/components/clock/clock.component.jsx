import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectClockTime } from '../../redux/stage/stage.selectors';

import './clock.styles.scss';
const Clock = ({time}) =>(
    <div className='clock-time'>
        <span className='label-message'><strong>Tiempo Restante: </strong></span>
        <span className='time'><small>{time}</small></span>
    </div>
);

const mapStateToProps = createStructuredSelector({
    time: selectClockTime
});

export default connect(mapStateToProps)(Clock);