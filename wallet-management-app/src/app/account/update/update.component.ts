import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-account-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class AccountUpdateComponent implements OnInit {
  accountForm: FormGroup;
  loading = false;
  loadingData = false;
  error = '';
  success = '';
  accountId = '';
  account: Account | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {
    this.accountForm = this.fb.group({
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      createdBy: ['', [Validators.required]]
    });
  }

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
    this.loadingData = true;
    this.error = '';

    this.accountService.getAccount(id).subscribe({
      next: (response) => {
        if (response.data) {
          this.account = response.data;
          this.populateForm();
        } else {
          this.error = 'Account not found';
        }
        this.loadingData = false;
      },
      error: (err) => {
        this.error = 'Failed to load account details. Please try again later.';
        console.error('Error loading account:', err);
        this.loadingData = false;
      }
    });
  }

  populateForm(): void {
    if (this.account) {
      this.accountForm.patchValue({
        name: this.account.name,
        phoneNumber: this.account.phoneNumber,
        createdBy: this.account.createdBy
      });
    }
  }

  onSubmit(): void {
    if (this.accountForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    const updatedAccount: Account = {
      ...this.account!,
      name: this.accountForm.value.name,
      phoneNumber: this.accountForm.value.phoneNumber,
      createdBy: this.accountForm.value.createdBy,
      dateUpdated: new Date().toISOString()
    };

    this.accountService.updateAccount(this.accountId, updatedAccount).subscribe({
      next: (response) => {
        this.loading = false;
        this.success = 'Account updated successfully!';
        setTimeout(() => {
          this.router.navigate(['/account/view', this.accountId]);
        }, 2000);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to update account. Please try again.';
        console.error('Error updating account:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/account/view', this.accountId]);
  }
}
