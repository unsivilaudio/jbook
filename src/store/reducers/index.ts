import { combineReducers } from 'redux';
import cellsReducer from 'store/reducers/cellsReducer';
import bundlesReducer from 'store/reducers/bundlesReducer';

const reducers = combineReducers({
    cells: cellsReducer,
    bundles: bundlesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
