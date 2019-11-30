import { createSelector } from 'reselect';

const  selectStage = state => state.stage;

export const selectMainStage = createSelector(
    [selectStage],
    stage => stage.mainStage
);

