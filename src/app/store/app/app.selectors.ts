import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from './app.reducer';

export const appStore = createFeatureSelector<IAppState>('app');

export const getSpinnerCount = (state: IAppState) => state?.spinnerCount;

export const selectSpinnerCount = createSelector(appStore, getSpinnerCount);
