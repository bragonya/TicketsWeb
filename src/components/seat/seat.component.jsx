import React from 'react';
import { connect } from 'react-redux';

import { CONST_SEAT_STATES } from '../../assets/constants';
import { setStateSeat } from '../../redux/stage/stage.actions';


const Seat = ({seatdata,setStateSeat}) =>{
    const { id, colname, state , key} = seatdata;
    var properties={
        key:`'span-'${key}${id}${colname}`,
            id:`${key}${id}${colname}`,
            onClick:
                state==='free' || state==='selected'?
                (evt)=>{
                    document.getElementById(evt.target.id).innerHTML="&#9635;";
                    setStateSeat({
                        columna : id,
                        fila : colname,
                        seccion : key,
                        estado : state==='selected'?CONST_SEAT_STATES.free:CONST_SEAT_STATES.selected
                    });
                }:()=>{}
                
    }
    return (
        state==='selected'?
        <span {...properties} >
            &#9635;
        </span>:
        <span {...properties} >
            &#9634;
        </span>
)};


const mapDispatchToProps = dispatch => ({
    setStateSeat: seat => dispatch(setStateSeat(seat))
});


export default connect(null,mapDispatchToProps)(Seat);