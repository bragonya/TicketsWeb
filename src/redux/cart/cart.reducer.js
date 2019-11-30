import { CartActionsTypes } from './cart.actions';
import { removeSeatCart } from './cart.utils';

const INITIAL_STATE = {
    items : [],
}

const cartReducer = (state = INITIAL_STATE,action) =>{
    switch(action.type){
        case CartActionsTypes.ADD_SEAT_CART:
            return {
                ...state,
                items : [...items,action.payload]
            }
        case CartActionsTypes.REMOVE_SEAT_CART:
            return{
                ...state,
                items: removeSeatCart(items,action.payload)
            }    
        default:
            return state;
    }
}

export default cartReducer;