import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { TransactionActions } from './action-types';
import { DataService } from '../service/data.service';
import { TransactionsEffects } from './effects';
import { Transaction } from '../model/transaction';


describe('transactions effects', () => {
    let effects: TransactionsEffects;
    let actions$: Observable<any>;
    let dataService = jasmine.createSpyObj('DataService', ['fetchTransactions']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TransactionsEffects,
                provideMockActions(() => actions$),
                { provide: DataService, useValue: dataService },
            ]
        });

        effects = TestBed.inject(TransactionsEffects);
        actions$ = TestBed.inject(Actions);
    });

    describe('loadTransactions$', () => {
        it('should call data service to fetch Transactions when loadTransactions action is triggred', () => {

            const action = TransactionActions.loadTransactions({ batchId: 111 });
            const transactions = [
                {
                    row_id: 14849341,
                    time: 1567721704000,
                    type: 'transaction',
                    sender: 'tz1bDXD6nNSrebqmAnnKKwnX1QdePSMCj4MX',
                    volume: 8001
                }
            ] as Transaction[];
            const completion = TransactionActions.loadTransactionsSuccess({ transactions });

            actions$ = hot('-a', { a: action });
            const response$ = cold('-a|', { a: transactions });
            const expected$ = cold('--b', { b: completion });

            dataService = TestBed.inject(DataService);
            dataService.fetchTransactions.and.returnValue(response$);

            effects.loadTransactions$.subscribe(() => {
                expect(dataService.fetchTransactions).toHaveBeenCalledWith(111);
            });

            expect(effects.loadTransactions$).toBeObservable(expected$);
        });

        it('should dispatch loadTransactionsFailure action when data service call failed', () => {
            const error = 'server error occurred';
            const action = TransactionActions.loadTransactions({ batchId: 111 });
            const completion = TransactionActions.loadTransactionsFailure({ error });

            actions$ = hot('-a', { a: action });
            const error$ = cold('-#', {}, error);
            const expected$ = cold('--b', { b: completion });

            dataService = TestBed.inject(DataService);
            dataService.fetchTransactions.and.returnValue(error$);

            effects.loadTransactions$.subscribe(() => {
                expect(dataService.fetchTransactions).toHaveBeenCalledWith(111);
            });

            expect(effects.loadTransactions$).toBeObservable(expected$);
        });

    });

});
