import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TransactionsContainerComponent } from './component/transactions-container/transactions-container.component';
import { TransactionsTableComponent } from './component/transactions-table/transactions-table.component';
import { BlockchainRoutingModule } from './blockchain-routing.module';
import { DataService } from './service/data.service';
import { TransactionsEffects } from './state/effects';
import { reducer } from './state/reducers';
import { Trim } from './pipe/trim.pipe';
import { MaterialModule } from '../material.module';

@NgModule({
    imports: [
        CommonModule,
        BlockchainRoutingModule,
        EffectsModule.forFeature([TransactionsEffects]),
        StoreModule.forFeature("blockchain", reducer),
        MaterialModule,
    ],
    declarations: [
        TransactionsContainerComponent,
        TransactionsTableComponent,
        Trim
    ],
    providers: [
        DataService,
    ]
})
export class BlockchainModule { }
