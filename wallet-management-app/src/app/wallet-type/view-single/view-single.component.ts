import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletTypeService } from '../../services/wallet-type.service';
import { WalletType } from '../../models/wallet-type.model';

@Component({
  selector: 'app-view-single',
  templateUrl: './view-single.component.html',
  styleUrls: ['./view-single.component.scss']
})
export class ViewSingleComponent implements OnInit {
  walletType: WalletType | null = null;
  loading = false;
  error = '';
  walletTypeId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private walletTypeService: WalletTypeService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.walletTypeId = id;
        this.loadWalletType(id);
      } else {
        this.error = 'Wallet type ID not provided';
      }
    });
  }

  loadWalletType(id: string): void {
    this.loading = true;
    this.error = '';

    this.walletTypeService.getWalletType(id).subscribe({
      next: (response) => {
        if (response.data) {
          this.walletType = response.data;
        } else {
          this.error = 'Wallet type not found';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load wallet type details. Please try again later.';
        console.error('Error loading wallet type:', err);
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/wallet-type']);
  }

  editWalletType(): void {
    this.router.navigate(['/wallet-type/edit', this.walletTypeId]);
  }

  deleteWalletType(): void {
    if (confirm('Are you sure you want to delete this wallet type?')) {
      this.walletTypeService.deleteWalletType(this.walletTypeId).subscribe({
        next: () => {
          this.router.navigate(['/wallet-type']);
        },
        error: (err) => {
          this.error = 'Failed to delete wallet type. Please try again later.';
          console.error('Error deleting wallet type:', err);
        }
      });
    }
  }
}
