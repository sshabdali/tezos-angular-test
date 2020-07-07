import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Input, Output, EventEmitter, Component } from '@angular/core';
import { Transaction } from '../../model/transaction';
import { TransactionsContainerComponent } from './transactions-container.component';
import { TransactionActions } from '../../state/action-types';
import { getTransactions } from '../../state/selectors';
import { By } from '@angular/platform-browser';

const mockTransactions = [
    {
        row_id: 14849341,
        time: 1567721704000,
        type: "transaction",
        sender: "tz1bDXD6nNSrebqmAnnKKwnX1QdePSMCj4MX",
        volume: 8001
    },
    {
        row_id: 16583041,
        time: 1571396056000,
        type: "transaction",
        sender: "tz1bDXD6nNSrebqmAnnKKwnX1QdePSMCj4MX",
        volume: 442.000000
    }
] as Transaction[];

describe('TransactionsContainerComponent', () => {
    let component: TransactionsContainerComponent;
    let fixture: ComponentFixture<TransactionsContainerComponent>;
    let mockStore: MockStore

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TransactionsContainerComponent,
                FakeTransactionsTableComponent
            ],
            providers: [provideMockStore()]
        });

        fixture = TestBed.createComponent(TransactionsContainerComponent);
        component = fixture.componentInstance;

        mockStore = TestBed.get(MockStore);
        mockStore.overrideSelector(getTransactions, mockTransactions);
        spyOn(mockStore, 'dispatch');

        fixture.detectChanges();
    });

    it('should load transactions for the first time', (done) => {
        const batchId = null
        const action = TransactionActions.loadTransactions({ batchId })
        expect(mockStore.dispatch).toHaveBeenCalledWith(action);

        component.transactions$.subscribe(data => {
            expect(data).toBe(mockTransactions);
            done();
        })
    });

    it('should load the next batch of transactions', () => {
        const batchId = 111

        // component.loadTransactions(batchId)
        // OR
        const fakeComponent = fixture.debugElement
            .query(By.directive(FakeTransactionsTableComponent))
            .injector.get(FakeTransactionsTableComponent);

        fakeComponent.loadMore.emit(batchId)

        const expectedAction = TransactionActions.loadTransactions({ batchId })
        expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
    });
});

//------------------Fake child component for shallow testing---------------------

@Component({
    selector: 'transactions-table',
    template: '<div></div>',
})
class FakeTransactionsTableComponent {
    @Input() transactions: Transaction[]
    @Output() loadMore = new EventEmitter<number>();
}


