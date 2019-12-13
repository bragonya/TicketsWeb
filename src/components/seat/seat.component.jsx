import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { CONST_SEAT_STATES } from '../../assets/constants';
import { setStateSeat } from '../../redux/stage/stage.actions';
import { addSeatCart, removeSeatCart } from '../../redux/cart/cart.actions';
import { selectConexionSocket, selectCurrentUser }from '../../redux/user/user.selectors';
import { selectCartItems } from '../../redux/cart/cart.selectors';



import PopoverGeneric from '../popover-generic/popover-generic.component';

import './seat.styles.scss';

const Seat = ({ seatdata, setStateSeat, conexionSocket, cartItems, addSeatCart, removeSeatCart, currentUser, history}) =>{
    const { id, colname, state , key , price, course} = seatdata;
    
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
                        curso: course,
                        estado : state==='selected'?CONST_SEAT_STATES.free:CONST_SEAT_STATES.selected
                    };
                    conexionSocket.emit(
                        'seatModified',
                        {   ...seatModified,
                            estado:state==='selected'?CONST_SEAT_STATES.free:CONST_SEAT_STATES.blocked
                        },
                        ({ status, message})=>{
                            if(status){
                                setStateSeat({
                                    ...seatModified
                                });
                                if(state==='selected'){
                                    removeSeatCart({...seatModified,price});
                                }else{
                                    addSeatCart({...seatModified,price});
                                }
                            }else{
                                alert(message);
                            }
                        }
                    );
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
            <PopoverGeneric key={`Popover${key}${id}${colname}`} colname={colname} column={id} >
                <i 
                    key= {`i${key}${id}${colname}`} 
                    id={`i${key}${id}${colname}`} 
                    className={"seat-element"}
                >A
                </i>
            </PopoverGeneric>
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