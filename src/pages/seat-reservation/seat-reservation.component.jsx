import React from 'react';

import MainStage from '../../components/main-stage/main-stage.component';

const SeatReservationPage = () =>(
    <MainStage
        onSelectSeat={seatId => {
            console.log("selected - " + seatId);
        }}
    />
);
export default SeatReservationPage;