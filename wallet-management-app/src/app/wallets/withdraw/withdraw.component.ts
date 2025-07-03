import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletService } from '../../services/wallet.service';
import { Wallet } from '../../models/wallet.model';

@Component({
  selector: 'app-wallet-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WalletWithdrawComponent implements OnInit {
  withdrawForm: FormGroup;
  wallet: Wallet | null = null;
  loading = false;
  loadingWallet = false;
  error = '';
  success = '';
  walletId = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private walletService: WalletService
  ) {
    this.withdrawForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.walletId = id;
        this.loadWallet(id);
      } else {
        this.error = 'Wallet ID not provided';
      }
    });
  }

  loadWallet(id: string): void {
    this.loadingWallet = true;
    this.error = '';

    this.walletService.getWallet(id).subscribe({
      next: (response) => {
        if (response.data) {
          this.wallet = response.data as Wallet;
        } else {
          this.error = 'Wallet not found';
        }
        this.loadingWallet = false;
      },
      error: (err) => {
        this.error = 'Failed to load wallet details. Please try again later.';
        console.error('Error loading wallet:', err);
        this.loadingWallet = false;
      }
    });
  }

  onSubmit(): void {
    if (this.withdrawForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    const amount = this.withdrawForm.value.amount;

    // Check if there are sufficient funds
    if (this.wallet && amount > this.wallet.balance) {
      this.error = 'Insufficient funds. Please enter a smaller amount.';
      this.loading = false;
      return;
    }

    this.walletService.withdraw(this.walletId, amount).subscribe({
      next: (response) => {
        this.loading = false;
        this.success = 'Withdrawal successful!';
        // Update the wallet balance
        if (response.data) {
          this.wallet = response.data as Wallet;
        }
        // Reset the form
        this.withdrawForm.reset();
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to withdraw funds. Please try again later.';
        console.error('Error withdrawing funds:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/wallets/view', this.walletId]);
  }
}
