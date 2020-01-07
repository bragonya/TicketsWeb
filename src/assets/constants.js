export const CONST_SEAT_STATES={
    free:'free',
    blocked:'blocked',
    sold:'sold',
    selected:'selected'
}

export const CONST_SPEAKERS_ENUM={
    kim:'KIM',
    kano:'KANO',
    both:'BOTH'
}

export const CONST_SPEAKERS_ORDER={
    KIM:1,
    KANO:2
}

export const CONST_PRICES={
    KIM:{
        'only':{
                LOUNGE:{
                    PRICE: 1800
                },
                VIP: {
                    PRICE:1600
                },
                PROFESIONAL: {
                    PRICE:1450
                }
        },
        'BOTH':{
            LOUNGE:{
                PRICE: 1400
            },
            VIP: {
                PRICE:1200
            },
            PROFESIONAL: {
                PRICE:1050
            }
        }
    },
    KANO:{
        'only':{
            LOUNGE:{
                PRICE: 1800
            },
            VIP: {
                PRICE:1600
            },
            PROFESIONAL: {
                PRICE:1450
            },
            ESTUDIANTE: {
                PRICE:750
            }
        },
        'BOTH':{
            LOUNGE:{
                PRICE: 1400
            },
            VIP: {
                PRICE:1200
            },
            PROFESIONAL: {
                PRICE:1050
            },
            ESTUDIANTE: {
                PRICE:600
            }
        }
    }
}
export const inputValidMessages = {
    requiredMessage : 'Este campo es requerido',
    invalidEmailMessage : 'Ingrese un correo electronico valido'
};
