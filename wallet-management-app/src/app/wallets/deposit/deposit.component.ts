import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletService } from '../../services/wallet.service';
import { Wallet } from '../../models/wallet.model';

@Component({
  selector: 'app-wallet-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class WalletDepositComponent implements OnInit {
  depositForm: FormGroup;
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
    this.depositForm = this.fb.group({
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
    if (this.depositForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    const amount = this.depositForm.value.amount;

    this.walletService.deposit(this.walletId, amount).subscribe({
      next: (response) => {
        this.loading = false;
        this.success = 'Deposit successful!';
        // Update the wallet balance
        if (response.data) {
          this.wallet = response.data as Wallet;
        }
        // Reset the form
        this.depositForm.reset();
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to deposit funds. Please try again later.';
        console.error('Error depositing funds:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/wallets/view', this.walletId]);
  }
}
