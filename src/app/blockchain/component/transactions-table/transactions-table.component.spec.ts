import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TransactionsTableComponent } from './transactions-table.component';
import { Transaction } from '../../model/transaction';
import { ListRange } from '@angular/cdk/collections';
import { Trim } from '../../pipe/trim.pipe';

const mockTransactions = [
    {
        row_id: 14849341,
        time: 1567721704000,
        type: 'transaction',
        sender: 'tz1bDXD6nNSrebqmAnnKKwnX1QdePSMCj4MX',
        volume: 8001
    },
    {
        row_id: 16583041,
        time: 1571396056000,
        type: 'transaction',
        sender: 'tz1bDXD6nNSrebqmAnnKKwnX1QdePSMCj4MX',
        volume: 442.000000
    }
] as Transaction[];

describe('TransactionsTableComponent', () => {
    let component: TransactionsTableComponent;
    let fixture: ComponentFixture<TransactionsTableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TransactionsTableComponent, Trim],
            imports: [ScrollingModule, MatIconModule, MatCardModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TransactionsTableComponent);
        component = fixture.componentInstance;
        component.transactions = mockTransactions;
        fixture.detectChanges();
    });

    it('should trigger loadMore event when scroll to the end of the transaction list', async () => {

        component.viewport.setRenderedRange({ end: 2 } as ListRange);
        spyOn(component.loadMore, 'emit');
        fixture.detectChanges();

        component.onIndexChange(2);

        expect(component.loadMore.emit).toHaveBeenCalledWith(mockTransactions[1].row_id);
    });

});
