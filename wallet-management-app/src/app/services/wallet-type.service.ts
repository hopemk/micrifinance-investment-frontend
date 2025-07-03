import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WalletType } from '../models/wallet-type.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WalletTypeService {
  private apiUrl = `${environment.apiUrl}/wallet-types`;

  constructor(private http: HttpClient) { }

  // Get all wallet types by owner ID
  getAllWalletTypes(ownerId: string): Observable<any> {
    const url = `${this.apiUrl}/owner-id/${ownerId}`;
    //const params = new HttpParams().set('ownerId', ownerId);
    return this.http.get<any>(url);
  }

  // Get a single wallet type by ID
  getWalletType(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  // Create a new wallet type
  createWalletType(walletType: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, walletType);
  }

  // Update a wallet type
  updateWalletType(id: string, walletType: WalletType): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, walletType);
  }

  // Delete a wallet type
  deleteWalletType(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
