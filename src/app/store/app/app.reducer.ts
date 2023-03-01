import { createReducer, on } from '@ngrx/store';
import { decreaseSpinner, increaseSpinner } from './app.actions';

export interface IAppState {
  spinnerCount: number;
}
const initialState: IAppState = {
  spinnerCount: null,
};

export const appReducer = createReducer(
  initialState,
  on(increaseSpinner, (state) => {
    return {
      ...state,
      spinnerCount: state.spinnerCount + 1,
    };
  }),
  on(decreaseSpinner, (state) => {
    if (state.spinnerCount <= 0) {
      return {
        ...state,
        spinnerCount: 0,
      };
    } else {
      return {
        ...state,
        spinnerCount: state.spinnerCount - 1,
      };
    }
  })
);
