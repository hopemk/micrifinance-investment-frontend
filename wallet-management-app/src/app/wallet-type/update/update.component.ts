import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletTypeService } from '../../services/wallet-type.service';
import { WalletType } from '../../models/wallet-type.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  walletTypeForm: FormGroup;
  loading = false;
  loadingData = false;
  error = '';
  success = '';
  walletTypeId = '';
  walletType: WalletType | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private walletTypeService: WalletTypeService
  ) {
    this.walletTypeForm = this.fb.group({
      name: ['', [Validators.required]],
      amountLimit: ['', [Validators.required]],
      ownerId: ['', [Validators.required]]
    });
  }

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
    this.loadingData = true;
    this.error = '';

    this.walletTypeService.getWalletType(id).subscribe({
      next: (response) => {
        if (response.data && response.data.length > 0) {
          this.walletType = response.data[0];
          this.populateForm();
        } else {
          this.error = 'Wallet type not found';
        }
        this.loadingData = false;
      },
      error: (err) => {
        this.error = 'Failed to load wallet type details. Please try again later.';
        console.error('Error loading wallet type:', err);
        this.loadingData = false;
      }
    });
  }

  populateForm(): void {
    if (this.walletType) {
      this.walletTypeForm.patchValue({
        name: this.walletType.name,
        amountLimit: this.walletType.amountLimit,
        ownerId: this.walletType.ownerId
      });
    }
  }

  onSubmit(): void {
    if (this.walletTypeForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    const updatedWalletType: WalletType = {
      ...this.walletType!,
      name: this.walletTypeForm.value.name,
      amountLimit: this.walletTypeForm.value.amountLimit,
      ownerId: this.walletTypeForm.value.ownerId,
      dateUpdated: new Date().toISOString()
    };

    this.walletTypeService.updateWalletType(this.walletTypeId, updatedWalletType).subscribe({
      next: (response) => {
        this.loading = false;
        this.success = 'Wallet type updated successfully!';
        setTimeout(() => {
          this.router.navigate(['/wallet-type/view', this.walletTypeId]);
        }, 2000);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to update wallet type. Please try again.';
        console.error('Error updating wallet type:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/wallet-type/view', this.walletTypeId]);
  }
}
