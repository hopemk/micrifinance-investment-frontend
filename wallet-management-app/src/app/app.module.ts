import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Imports
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WalletTypeComponent } from './wallet-type/wallet-type.component';
import { AccountComponent } from './account/account.component';
import { WalletsComponent } from './wallets/wallets.component';
import { ViewAllComponent } from './wallet-type/view-all/view-all.component';
import { CreateComponent } from './wallet-type/create/create.component';
import { ViewSingleComponent } from './wallet-type/view-single/view-single.component';
import { UpdateComponent } from './wallet-type/update/update.component';

// Account Components
import { AccountViewAllComponent } from './account/view-all/view-all.component';
import { AccountCreateComponent } from './account/create/create.component';
import { AccountViewSingleComponent } from './account/view-single/view-single.component';
import { AccountUpdateComponent } from './account/update/update.component';

// Wallet Components
import { WalletViewAllComponent } from './wallets/view-all/view-all.component';
import { WalletViewSingleComponent } from './wallets/view-single/view-single.component';
import { WalletDepositComponent } from './wallets/deposit/deposit.component';
import { WalletWithdrawComponent } from './wallets/withdraw/withdraw.component';

@NgModule({
  declarations: [
    AppComponent,
    WalletTypeComponent,
    AccountComponent,
    WalletsComponent,
    ViewAllComponent,
    CreateComponent,
    ViewSingleComponent,
    UpdateComponent,
    AccountViewAllComponent,
    AccountCreateComponent,
    AccountViewSingleComponent,
    AccountUpdateComponent,
    WalletViewAllComponent,
    WalletViewSingleComponent,
    WalletDepositComponent,
    WalletWithdrawComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // Angular Material Modules
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
