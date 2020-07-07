import { getTransactions, getErrorMessage } from './selectors';
import { Transaction } from '../model/transaction';

describe("transactions selector", () => {
    it("should return transactions for getTransactions selector", () => {

        const transactions = [
            {
                row_id: 14849341,
                time: 1567721704000,
                type: "transaction",
                sender: "tz1bDXD6nNSrebqmAnnKKwnX1QdePSMCj4MX",
                volume: 8001
            }
        ] as Transaction[]

        const mockState = { transactions };
        expect(getTransactions.projector(mockState)).toBe(transactions);
    });

    it("should return error message for getErrorMessage selector", () => {
        const mockState = { error: 'something wrong' };
        expect(getErrorMessage.projector(mockState)).toEqual('something wrong');
    });
});