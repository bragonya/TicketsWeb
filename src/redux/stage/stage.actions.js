import {StageActionsTypes} from './stage.types';
export const setStateSeat = seat =>({
    type: StageActionsTypes.SET_STATE_SEAT,
    payload: seat
});

export const setClockTime = time =>({
    type: StageActionsTypes.SET_CLOCK_TIME,
    payload: time
});

export const setSpeaker = time =>({
    type: StageActionsTypes.SET_SPEAKER,
    payload: time
});