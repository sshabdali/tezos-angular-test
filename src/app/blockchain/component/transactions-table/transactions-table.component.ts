import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Transaction } from '../../model/transaction';

@Component({
    selector: 'transactions-table',
    templateUrl: './transactions-table.component.html',
    styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent {
    @Input() transactions: Transaction[];
    @Output() loadMore = new EventEmitter<number>();

    @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

    onIndexChange(idx) {
        if (idx) {
            const nextBatchId = this.transactions[this.transactions.length - 1].row_id;
            const end = this.viewport.getRenderedRange().end;
            const total = this.viewport.getDataLength();

            if (end === total) {
                this.loadMore.emit(nextBatchId);
            }
        }
    }

    trackByIdx(i: number) {
        return i;
    }
}
