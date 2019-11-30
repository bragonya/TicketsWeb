import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { CONST_SEAT_STATES } from '../../assets/constants';
import { setStateSeat } from '../../redux/stage/stage.actions';
import { selectConexionSocket }from '../../redux/user/user.selectors';

const Seat = ({seatdata,setStateSeat,conexionSocket}) =>{
    const { id, colname, state , key} = seatdata;
    var properties={
        key:`'span-'${key}${id}${colname}`,
            id:`${key}${id}${colname}`,
            onClick:
                state==='free' || state==='selected'?
                (evt)=>{
                    document.getElementById(`i${key}${id}${colname}`).style.backgroundColor= state==='free'?'black':'white';
                    const seatModified = {
                        columna : id,
                        fila : colname,
                        seccion : key,
                        estado : state==='selected'?CONST_SEAT_STATES.free:CONST_SEAT_STATES.selected
                    };

                    conexionSocket.emit('seatModified',{...seatModified,estado:state==='selected'?CONST_SEAT_STATES.free:CONST_SEAT_STATES.blocked});
                    setStateSeat({
                        ...seatModified
                    });

                }:()=>{}
                
    }
    return (
        state==='free'?
        <span {...properties} >
            <i id={`i${key}${id}${colname}`} className="fas fa-chair"></i>
        </span>:
        <span {...properties} >
            <i id={`i${key}${id}${colname}`} className="fas fa-chair"></i>
        </span>
)};

const mapStateToProps = createStructuredSelector({
    conexionSocket: selectConexionSocket
});

const mapDispatchToProps = dispatch => ({
    setStateSeat: seat => dispatch(setStateSeat(seat))
});


export default connect(mapStateToProps,mapDispatchToProps)(Seat);