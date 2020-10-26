import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsDetailComponent } from './components/pages/clients/clients-detail/clients-detail.component';
import { ClientsComponent } from './components/pages/clients/clients.component';
import { ClientsResolverGuard } from './guards/clients-resolver.guard';
import { ClientsDetailResolverGuard } from './guards/clients-detail-resolver.guard';
import { ClientsDetailAccountsResolverGuard } from './guards/clients-detail-accounts-resolver.guard';
import { AccountsResolverGuard } from './guards/accounts-resolver.guard';

const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: 'clients', component: ClientsComponent, resolve: { data: ClientsResolverGuard, accounts: AccountsResolverGuard }},
  { path: 'client/:id', component: ClientsDetailComponent, resolve: { data: ClientsDetailResolverGuard, accounts: ClientsDetailAccountsResolverGuard } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
