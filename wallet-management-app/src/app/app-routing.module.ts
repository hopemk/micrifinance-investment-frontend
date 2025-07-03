import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletTypeComponent } from './wallet-type/wallet-type.component';
import { AccountComponent } from './account/account.component';
import { WalletsComponent } from './wallets/wallets.component';
import { ViewAllComponent } from './wallet-type/view-all/view-all.component';
import { CreateComponent } from './wallet-type/create/create.component';
import { ViewSingleComponent } from './wallet-type/view-single/view-single.component';
import { UpdateComponent } from './wallet-type/update/update.component';

// Account Components
import { AccountCreateComponent } from './account/create/create.component';
import { AccountViewSingleComponent } from './account/view-single/view-single.component';
import { AccountUpdateComponent } from './account/update/update.component';

// Wallet Components
import { WalletViewAllComponent } from './wallets/view-all/view-all.component';
import { WalletViewSingleComponent } from './wallets/view-single/view-single.component';
import { WalletDepositComponent } from './wallets/deposit/deposit.component';
import { WalletWithdrawComponent } from './wallets/withdraw/withdraw.component';

const routes: Routes = [
  { path: '', redirectTo: '/wallets', pathMatch: 'full' },
  { path: 'wallet-type', component: WalletTypeComponent },
  { path: 'wallet-type/create', component: CreateComponent },
  { path: 'wallet-type/view/:id', component: ViewSingleComponent },
  { path: 'wallet-type/edit/:id', component: UpdateComponent },
  { path: 'account', component: AccountComponent },
  { path: 'account/create', component: AccountCreateComponent },
  { path: 'account/view/:id', component: AccountViewSingleComponent },
  { path: 'account/edit/:id', component: AccountUpdateComponent },
  { path: 'wallets', component: WalletViewAllComponent },
  { path: 'wallets/view/:id', component: WalletViewSingleComponent },
  { path: 'wallets/deposit/:id', component: WalletDepositComponent },
  { path: 'wallets/withdraw/:id', component: WalletWithdrawComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
