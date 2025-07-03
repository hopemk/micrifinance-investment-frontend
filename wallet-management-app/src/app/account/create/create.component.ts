import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

declare var Swal: any; // SweetAlert2

@Component({
  selector: 'app-account-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class AccountCreateComponent implements OnInit {
  accountForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    this.accountForm = this.fb.group({
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      createdBy: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.accountForm.invalid) {
      return;
    }

    this.loading = true;

    const account = {
      name: this.accountForm.value.name,
      phoneNumber: this.accountForm.value.phoneNumber,
      createdBy: this.accountForm.value.createdBy
    };

    this.accountService.createAccount(account).subscribe({
      next: (response) => {
        this.loading = false;
        // Display success message using SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.message || 'Account created successfully',
          confirmButtonColor: '#1976d2'
        }).then(() => {
          this.router.navigate(['/account']);
        });
      },
      error: (err) => {
        this.loading = false;
        // Display error message using SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to create account. Please try again.',
          confirmButtonColor: '#1976d2'
        });
        console.error('Error creating account:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/account']);
  }
}
