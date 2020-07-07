import { reducer, initialTransactionsState } from '../state/reducers';
import { TransactionActions } from './action-types';
import { Transaction } from '../model/transaction';

describe("transaction reducers", () => {

    it("should handle loadTransactionsSuccess action and add transactions to store", () => {

        const transactions = [
            {
                row_id: 14849341,
                time: 1567721704000,
                type: "transaction",
                sender: "tz1bDXD6nNSrebqmAnnKKwnX1QdePSMCj4MX",
                volume: 8001
            }
        ] as Transaction[];

        const action = TransactionActions.loadTransactionsSuccess({ transactions });
        const result = reducer(initialTransactionsState, action);
        expect(result.transactions).toEqual(transactions);
    });

    it("should handle loadTransactionsFailure action and update error to store", () => {

        const msg = 'server error occurred';

        const action = TransactionActions.loadTransactionsFailure({ error: msg });
        const result = reducer(initialTransactionsState, action);
        expect(result.error).toEqual(msg);
    });
})