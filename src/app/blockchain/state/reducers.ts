import { createReducer, on } from '@ngrx/store';
import { TransactionActions } from './action-types';
import { Transaction } from '../model/transaction';

export interface TransactionsState {
    transactions: Transaction[];
    error: string;
}

export const initialTransactionsState: TransactionsState = {
    transactions: [],
    error: ''
};

export const reducer = createReducer(

    initialTransactionsState,

    on(TransactionActions.loadTransactionsSuccess, (state, action) => {
        const fetchedTransactions = state.transactions.concat(action.transactions);
        return {
            ...state,
            transactions: fetchedTransactions,
            error: ''
        };
    }),
    on(TransactionActions.loadTransactionsFailure, (state, action) => {
        return {
            ...state,
            error: action.error
        };
    })
);

