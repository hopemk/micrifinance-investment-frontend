import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WalletTypeService } from '../../services/wallet-type.service';
import { WalletType } from '../../models/wallet-type.model';

declare var Swal: any; // SweetAlert2

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  walletTypeForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private walletTypeService: WalletTypeService,
    private router: Router
  ) {
    this.walletTypeForm = this.fb.group({
      name: ['', [Validators.required]],
      amountLimit: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.walletTypeForm.invalid) {
      return;
    }

    this.loading = true;

    const walletType = {
      name: this.walletTypeForm.value.name,
      amountLimit: this.walletTypeForm.value.amountLimit
    };

    this.walletTypeService.createWalletType(walletType).subscribe({
      next: (response) => {
        this.loading = false;
        // Display success message using SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.message || 'Wallet type created successfully',
          confirmButtonColor: '#1976d2'
        }).then(() => {
          this.router.navigate(['/wallet-type']);
        });
      },
      error: (err) => {
        this.loading = false;
        // Display error message using SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to create wallet type. Please try again.',
          confirmButtonColor: '#1976d2'
        });
        console.error('Error creating wallet type:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/wallet-type']);
  }
}
