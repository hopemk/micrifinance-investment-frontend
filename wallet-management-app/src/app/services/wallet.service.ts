import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wallet, ApiResponse } from '../models/wallet.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private apiUrl = `${environment.apiUrl}/wallets`;

  constructor(private http: HttpClient) { }

  // Get all wallets by owner ID
  getWalletsByOwnerId(ownerId: string): Observable<ApiResponse> {
    const url = `${this.apiUrl}/owner-id/${ownerId}`;
    return this.http.get<ApiResponse>(url);
  }

  // Get a single wallet by ID
  getWallet(id: string): Observable<ApiResponse> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ApiResponse>(url);
  }

  // Deposit to a wallet
  deposit(id: string, amount: number): Observable<ApiResponse> {
    const url = `${this.apiUrl}/${id}/deposit`;
    return this.http.post<ApiResponse>(url, { amount });
  }

  // Withdraw from a wallet
  withdraw(id: string, amount: number): Observable<ApiResponse> {
    const url = `${this.apiUrl}/${id}/withdraw`;
    return this.http.post<ApiResponse>(url, { amount });
  }

  // Deactivate a wallet
  deactivate(id: string): Observable<ApiResponse> {
    const url = `${this.apiUrl}/${id}/deactivate`;
    return this.http.post<ApiResponse>(url, {});
  }

  // Create a new wallet
  createWallet(wallet: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, wallet);
  }

  // Update a wallet
  updateWallet(id: string, wallet: Wallet): Observable<ApiResponse> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<ApiResponse>(url, wallet);
  }

  // Delete a wallet
  deleteWallet(id: string): Observable<ApiResponse> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<ApiResponse>(url);
  }
}
