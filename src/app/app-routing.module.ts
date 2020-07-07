import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/transactions', pathMatch: 'full' },
    {
        path: 'transactions',
        loadChildren: () => import('./blockchain/blockchain.module').then(m => m.BlockchainModule),
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
