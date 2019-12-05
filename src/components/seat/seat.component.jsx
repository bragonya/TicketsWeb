import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { CONST_SEAT_STATES } from '../../assets/constants';
import { setStateSeat } from '../../redux/stage/stage.actions';
import { addSeatCart, removeSeatCart } from '../../redux/cart/cart.actions';
import { selectConexionSocket }from '../../redux/user/user.selectors';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './seat.styles.scss';

const Seat = ({ seatdata, setStateSeat, conexionSocket, cartItems, addSeatCart, removeSeatCart, currentUser, history}) =>{
    const { id, colname, state , key , price} = seatdata;
    var properties={
        key:`'span-'${key}${id}${colname}`,
            id:`${key}${id}${colname}`,
            onClick:
                state==='free' || state==='selected'?
                (evt)=>{
                    if(cartItems.length===5 && state==='free') return ;
                    if (!currentUser){ history.push('/signinsignup'); return; }
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
                    if(state==='selected'){
                        removeSeatCart({...seatModified,price});
                    }else{
                        addSeatCart({...seatModified,price});
                    }
                }:()=>{}
                
    }
    return (
        state==='free'?
        <span {...properties} >
            <i id={`i${key}${id}${colname}`} className="seat-element">A</i>
        </span>:state==='selected'?
        <span {...properties} >
        <i id={`i${key}${id}${colname}`} className="seat-element">A</i>
        </span>:
        <span {...properties} >
            <i 
                id={`i${key}${id}${colname}`} 
                className="seat-element"
                data-toggle="popover" 
                title={`Liberar Asiento ${colname}-${id}`}
                data-content="And here's some amazing content. It's very engaging. Right?"  
            >A
            </i>
        </span>
)};

const mapStateToProps = createStructuredSelector({
    conexionSocket: selectConexionSocket,
    cartItems : selectCartItems,
    currentUser : selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    setStateSeat: seat => dispatch(setStateSeat(seat)),
    addSeatCart:  seat => dispatch(addSeatCart(seat)),
    removeSeatCart:  seat => dispatch(removeSeatCart(seat))
});


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Seat));