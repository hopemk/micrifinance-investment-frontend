import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = `${environment.apiUrl}/accounts`;

  constructor(private http: HttpClient) { }

  // Get all accounts
  getAllAccounts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Get all accounts by owner ID
  getAccountsByOwnerId(ownerId: string): Observable<any> {
    const url = `${this.apiUrl}/owner-id/${ownerId}`;
    return this.http.get<any>(url);
  }

  // Get a single account by ID
  getAccount(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  // Create a new account
  createAccount(account: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, account);
  }

  // Update an account
  updateAccount(id: string, account: Account): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, account);
  }

  // Delete an account
  deleteAccount(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
