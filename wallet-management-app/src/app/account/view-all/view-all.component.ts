import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class AccountViewAllComponent implements OnInit {
  accounts: Account[] = [];
  loading = false;
  error = '';
  ownerId = 'string'; // Default owner ID, can be changed later

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.loading = true;
    this.error = '';

    this.accountService.getAccountsByOwnerId(this.ownerId).subscribe({
      next: (response) => {
        this.accounts = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load accounts. Please try again later.';
        console.error('Error loading accounts:', err);
        this.loading = false;
      }
    });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/account/view', id]);
  }

  editAccount(id: string): void {
    this.router.navigate(['/account/edit', id]);
  }

  deleteAccount(id: string): void {
    if (confirm('Are you sure you want to delete this account?')) {
      this.accountService.deleteAccount(id).subscribe({
        next: () => {
          this.loadAccounts(); // Reload the list after deletion
        },
        error: (err) => {
          this.error = 'Failed to delete account. Please try again later.';
          console.error('Error deleting account:', err);
        }
      });
    }
  }

  createNewAccount(): void {
    this.router.navigate(['/account/create']);
  }
}
