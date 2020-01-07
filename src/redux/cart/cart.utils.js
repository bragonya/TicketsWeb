export const removeSeatFromCart = (items,seatToRemove)=>{
    const {fila,columna,seccion,curso} = seatToRemove;
    return items.filter(seat=> seat.key !== Object.values({fila,columna,seccion,curso}).join(""))
};

export const addSeatToCart = (items,seatToAdd)=>{
    const {fila,columna,seccion,curso} = seatToAdd;
    localStorage.setItem('cartItems',JSON.stringify([...items,{...seatToAdd,key:Object.values({fila,columna,seccion,curso}).join("")}]));
    return [...items,{...seatToAdd,key:Object.values({fila,columna,seccion,curso}).join("")}]
}

export const getAmountSeatsOfCourse = (items, courseName) =>{
    return items.reduce((acc,cur) => cur.curso===courseName ? ++acc : acc, 0);
}