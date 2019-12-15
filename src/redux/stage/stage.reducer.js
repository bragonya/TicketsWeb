import { StageActionsTypes } from './stage.types';
import event_seats_structure from '../../assets/seat-structure';

import {setStateToSeat} from './stage.utils';

const INITIAL_STATE = {
    mainStage : event_seats_structure,
    currentCourse: 'KIM',
    clockTime : '' 
}

const stageReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case StageActionsTypes.SET_STATE_SEAT:
            return {
                ...state,
                mainStage : setStateToSeat(state.mainStage,action.payload)
            }
        case StageActionsTypes.SET_CLOCK_TIME:
            return {
                ...state,
                clockTime : action.payload
            }    
        default:
            return state;
    }
}

export default stageReducer;