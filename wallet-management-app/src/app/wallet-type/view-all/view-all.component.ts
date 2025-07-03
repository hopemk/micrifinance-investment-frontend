import { Component, OnInit } from '@angular/core';
import { WalletTypeService } from '../../services/wallet-type.service';
import { WalletType } from '../../models/wallet-type.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent implements OnInit {
  walletTypes: WalletType[] = [];
  loading = false;
  error = '';
  ownerId = 'string'; // Default owner ID, can be changed later

  constructor(
    private walletTypeService: WalletTypeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadWalletTypes();
  }

  loadWalletTypes(): void {
    this.loading = true;
    this.error = '';

    this.walletTypeService.getAllWalletTypes(this.ownerId).subscribe({
      next: (response) => {
        this.walletTypes = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load wallet types. Please try again later.';
        console.error('Error loading wallet types:', err);
        this.loading = false;
      }
    });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/wallet-type/view', id]);
  }

  editWalletType(id: string): void {
    this.router.navigate(['/wallet-type/edit', id]);
  }

  deleteWalletType(id: string): void {
    if (confirm('Are you sure you want to delete this wallet type?')) {
      this.walletTypeService.deleteWalletType(id).subscribe({
        next: () => {
          this.loadWalletTypes(); // Reload the list after deletion
        },
        error: (err) => {
          this.error = 'Failed to delete wallet type. Please try again later.';
          console.error('Error deleting wallet type:', err);
        }
      });
    }
  }

  createNewWalletType(): void {
    this.router.navigate(['/wallet-type/create']);
  }
}
