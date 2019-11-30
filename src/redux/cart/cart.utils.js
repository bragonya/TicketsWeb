
export const removeSeatFromCart = (items,seatToRemove)=>{
    const {fila,columna,seccion} = seatToRemove;
    return items.filter(seat=> seat.key !== Object.values({fila,columna,seccion}).join(""))
};

export const addSeatToCart = (items,seatToAdd)=>{
    const {fila,columna,seccion} = seatToAdd;
    return [...items,{...seatToAdd,key:Object.values({fila,columna,seccion}).join("")}]
}