import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-account-view-single',
  templateUrl: './view-single.component.html',
  styleUrls: ['./view-single.component.scss']
})
export class AccountViewSingleComponent implements OnInit {
  account: Account | null = null;
  loading = false;
  error = '';
  accountId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.accountId = id;
        this.loadAccount(id);
      } else {
        this.error = 'Account ID not provided';
      }
    });
  }

  loadAccount(id: string): void {
    this.loading = true;
    this.error = '';

    this.accountService.getAccount(id).subscribe({
      next: (response) => {
        if (response.data) {
          this.account = response.data;
        } else {
          this.error = 'Account not found';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load account details. Please try again later.';
        console.error('Error loading account:', err);
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/account']);
  }

  editAccount(): void {
    this.router.navigate(['/account/edit', this.accountId]);
  }

  deleteAccount(): void {
    if (confirm('Are you sure you want to delete this account?')) {
      this.accountService.deleteAccount(this.accountId).subscribe({
        next: () => {
          this.router.navigate(['/account']);
        },
        error: (err) => {
          this.error = 'Failed to delete account. Please try again later.';
          console.error('Error deleting account:', err);
        }
      });
    }
  }
}
