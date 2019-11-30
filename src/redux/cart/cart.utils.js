
export const removeSeatCart = (items,seatToAdd)=>{
    return items.filter(seat=> 
                            seat.row !== seatToAdd.fila 
                            && seat.id !== seatToAdd.columna 
                            && seat.section !== seatToAdd.seccion
                        )
};