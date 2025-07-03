import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { Wallet } from '../../models/wallet.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class WalletViewAllComponent implements OnInit {
  wallets: Wallet[] = [];
  loading = false;
  error = '';
  ownerId = 'string'; // Default owner ID, can be changed later

  constructor(
    private walletService: WalletService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadWallets();
  }

  loadWallets(): void {
    this.loading = true;
    this.error = '';

    this.walletService.getWalletsByOwnerId(this.ownerId).subscribe({
      next: (response) => {
        this.wallets = response.data as Wallet[];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load wallets. Please try again later.';
        console.error('Error loading wallets:', err);
        this.loading = false;
      }
    });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/wallets/view', id]);
  }

  deposit(id: string): void {
    this.router.navigate(['/wallets/deposit', id]);
  }

  withdraw(id: string): void {
    this.router.navigate(['/wallets/withdraw', id]);
  }

  deactivate(id: string): void {
    if (confirm('Are you sure you want to deactivate this wallet?')) {
      this.walletService.deactivate(id).subscribe({
        next: () => {
          this.loadWallets(); // Reload the list after deactivation
        },
        error: (err) => {
          this.error = 'Failed to deactivate wallet. Please try again later.';
          console.error('Error deactivating wallet:', err);
        }
      });
    }
  }

  createNewWallet(): void {
    this.router.navigate(['/wallets/create']);
  }
}
