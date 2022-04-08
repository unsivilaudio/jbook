import { Dispatch } from 'redux';
import { Action } from 'store/actions';
import { ActionType } from 'store/action-types';
import { saveCells } from 'store/action-creators';
import { RootState } from 'store/reducers';

let timer: any;

export const persistMiddleware = ({
    dispatch,
    getState,
}: {
    dispatch: Dispatch<Action>;
    getState: () => RootState;
}) => (next: (action: Action) => void) => (action: Action) => {
    next(action);

    if (
        [
            ActionType.MOVE_CELL,
            ActionType.UPDATE_CELL,
            ActionType.INSERT_CELL_AFTER,
            ActionType.DELETE_CELL,
        ].includes(action.type)
    ) {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            saveCells()(dispatch, getState);
        }, 750);
    }
};
