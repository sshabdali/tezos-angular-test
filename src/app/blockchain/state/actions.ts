import { createAction, props } from '@ngrx/store';
import { Transaction } from '../model/transaction';

export const loadTransactions = createAction(
    "[Transactions Container] Load Transactions By Page",
    props<{ batchId: number }>()
);

export const loadTransactionsSuccess = createAction(
    "[Transactions Effect] Transactions Successfully Loaded",
    props<{ transactions: Transaction[] }>()
);

export const loadTransactionsFailure = createAction(
    '[Transactions Effect] Transactions Load Failure',
    props<{ error: string }>()
);