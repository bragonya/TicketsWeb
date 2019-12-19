import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectClockTime } from '../../redux/stage/stage.selectors';

import './clock.styles.scss';
const Clock = ({time}) =>(
    <div className='clock-time'>
        <span className='label-message'><strong>Tiempo Restante: </strong></span>
        <span className='time'><strong>{`00:${separateTime(time)}`}</strong></span>
    </div>
);

const separateTime = (time)=>{
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    return `${minutes<10?'0':''}${minutes}:${seconds<10?'0':''}${seconds}`
}
const mapStateToProps = createStructuredSelector({
    time: selectClockTime
});

export default connect(mapStateToProps)(Clock);