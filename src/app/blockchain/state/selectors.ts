import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionsState } from './reducers';

export const getTransactionsState = createFeatureSelector<TransactionsState>('blockchain');

export const getTransactions = createSelector(
    getTransactionsState,
    state => state.transactions
);

export const getErrorMessage = createSelector(
    getTransactionsState,
    state => state.error
);
