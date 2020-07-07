import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app-reducer';
import { Transaction } from "../../model/transaction";
import { loadTransactions } from '../../state/actions';
import { getTransactions, getErrorMessage } from '../../state/selectors';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'transactions-container',
    templateUrl: './transactions-container.component.html',
    styleUrls: ['./transactions-container.component.scss']
})
export class TransactionsContainerComponent implements OnInit {

    errorMessage$: Observable<string>;
    transactions$: Observable<Transaction[]>;

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
        this.transactions$ = this.store.pipe(select(getTransactions));
        this.errorMessage$ = this.store.pipe(select(getErrorMessage));

        this.loadTransactions(null)
    }

    loadTransactions(batchId: number) {
        this.store.dispatch(loadTransactions({ batchId }));
    }
}