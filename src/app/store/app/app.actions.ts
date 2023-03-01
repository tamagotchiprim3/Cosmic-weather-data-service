import { createAction } from '@ngrx/store';

export const increaseSpinner = createAction('[App] increase spinner');

export const decreaseSpinner = createAction('[App] decrease spinner');
