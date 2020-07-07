import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionsContainerComponent } from './component/transactions-container/transactions-container.component';

const routes: Routes = [
    { path: '', component: TransactionsContainerComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlockchainRoutingModule { }
