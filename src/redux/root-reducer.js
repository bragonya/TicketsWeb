import {combineReducers} from 'redux';

import userReducer from './user/user.reducer';
import stageReducer from './stage/stage.reducer';
export default combineReducers({
    user : userReducer,
    stage : stageReducer
});