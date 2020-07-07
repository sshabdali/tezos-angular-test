import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, concatMap } from 'rxjs/operators';
import { TransactionActions } from './action-types';
import { loadTransactionsSuccess } from './actions';
import { DataService } from '../service/data.service';


@Injectable()
export class TransactionsEffects {

    loadTransactions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TransactionActions.loadTransactions),
            concatMap(action => {
                return this.dataService.fetchTransactions(action.batchId)
                    .pipe(
                        map(transactions => loadTransactionsSuccess({ transactions })),
                        catchError(error => of(TransactionActions.loadTransactionsFailure({ error })))
                    );
            })
        )
    );

    constructor(private actions$: Actions, private dataService: DataService) {
    }
}
