import { CartActionsTypes } from './cart.types';

export const addSeatCart = seat =>({
    type: CartActionsTypes.ADD_SEAT_CART,
    payload : seat
});

export const removeSeatCart = seat =>({
    type: CartActionsTypes.REMOVE_SEAT_CART,
    payload : seat
});
