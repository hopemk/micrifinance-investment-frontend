import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletService } from '../../services/wallet.service';
import { Wallet } from '../../models/wallet.model';

@Component({
  selector: 'app-wallet-view-single',
  templateUrl: './view-single.component.html',
  styleUrls: ['./view-single.component.scss']
})
export class WalletViewSingleComponent implements OnInit {
  wallet: Wallet | null = null;
  loading = false;
  error = '';
  walletId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private walletService: WalletService
  ) { }

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
    this.loading = true;
    this.error = '';

    this.walletService.getWallet(id).subscribe({
      next: (response) => {
        if (response.data) {
          this.wallet = response.data as Wallet;
        } else {
          this.error = 'Wallet not found';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load wallet details. Please try again later.';
        console.error('Error loading wallet:', err);
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/wallets']);
  }

  deposit(): void {
    this.router.navigate(['/wallets/deposit', this.walletId]);
  }

  withdraw(): void {
    this.router.navigate(['/wallets/withdraw', this.walletId]);
  }

  deactivate(): void {
    if (confirm('Are you sure you want to deactivate this wallet?')) {
      this.walletService.deactivate(this.walletId).subscribe({
        next: () => {
          this.router.navigate(['/wallets']);
        },
        error: (err) => {
          this.error = 'Failed to deactivate wallet. Please try again later.';
          console.error('Error deactivating wallet:', err);
        }
      });
    }
  }
}
