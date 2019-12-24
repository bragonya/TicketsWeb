import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { CONST_SEAT_STATES, CONST_SPEAKERS_ENUM } from '../../assets/constants';
import { setStateSeat } from '../../redux/stage/stage.actions';
import { addSeatCart, removeSeatCart } from '../../redux/cart/cart.actions';
import { selectConexionSocket, selectCurrentUser }from '../../redux/user/user.selectors';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { selectCurrentCourse,selectSpeaker } from '../../redux/stage/stage.selectors';
import { CONST_PRICES } from '../../assets/constants';


import PopoverGeneric from '../popover-generic/popover-generic.component';

import './seat.styles.scss';

const Seat = ({ seatdata, setStateSeat, conexionSocket, cartItems, addSeatCart, removeSeatCart, currentUser, currentCourse, speaker, history}) =>{
    const { id, colname, state , key , idN, course} = seatdata;
    const disablePopover = currentUser?(currentUser.admin?false:true):true;   
    var properties={
        key:`'span-'${key}${id}${colname}`,
            id:`${key}${id}${colname}`,
            onClick:
                state==='free' || state==='selected'?
                (evt)=>{
                    if(cartItems.length===5 && state==='free' && !(currentUser.admin)) return ;
                    if (!currentUser){ history.push('/signinsignup'); return; }
                    const seatModified = {
                        columna : id,
                        fila : colname,
                        seccion : key,
                        curso: course,
                        estado : state==='selected'?CONST_SEAT_STATES.free:CONST_SEAT_STATES.selected
                    };
                    alert('HOLA');
                    conexionSocket.emit(
                        'seatModified',
                        {   ...seatModified,
                            estado:state==='selected'?CONST_SEAT_STATES.free:CONST_SEAT_STATES.blocked,
                            user:localStorage.getItem('user')?{...JSON.parse(localStorage.getItem('user'))}:null 
                        },
                        ({ status, message})=>{
                            console.log('callback seatModified');
                            console.log(status);
                            console.log(message);
                            if(status){
                                setStateSeat({
                                    ...seatModified
                                });
                                if(state==='selected'){
                                    removeSeatCart({...seatModified,
                                        price:CONST_PRICES[currentCourse][speaker=!CONST_SPEAKERS_ENUM.both?'only':CONST_SPEAKERS_ENUM.both][idN].PRICE
                                    });
                                }else{
                                    addSeatCart({...seatModified,
                                        price: CONST_PRICES[currentCourse][speaker=!CONST_SPEAKERS_ENUM.both?'only':CONST_SPEAKERS_ENUM.both][idN].PRICE
                                    });
                                }
                            }else{
                                alert(message);
                            }
                        }
                    );
                }:()=>{
                    if (!currentUser) history.push('/signinsignup'); return;
                }
                
    }
    return (
        state==='free'?
        <span {...properties} >
            <i id={`i${key}${id}${colname}`} className="seat-element">A</i>
        </span>:state==='selected'?
        <span {...properties} >
        <i id={`i${key}${id}${colname}`} className="seat-element">A</i>
        </span>:state==='blocked'?
        <span {...properties} >
        <i id={`i${key}${id}${colname}`} className="seat-element">A</i>
        </span>:
        <span {...properties} >
            
            <PopoverGeneric 
                key={`Popover${key}${id}${colname}`} 
                rowname = {colname} 
                column  = {id} 
                section = {key}
                course  = {course}
                disablePopover={disablePopover} >
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
    currentUser : selectCurrentUser,
    currentCourse: selectCurrentCourse,
    speaker : selectSpeaker
});

const mapDispatchToProps = dispatch => ({
    setStateSeat: seat => dispatch(setStateSeat(seat)),
    addSeatCart:  seat => dispatch(addSeatCart(seat)),
    removeSeatCart:  seat => dispatch(removeSeatCart(seat))
});


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Seat));