import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss']
})
export class WalletsComponent implements OnInit {
  wallets = [
    {
      id: 1,
      name: 'Primary Savings',
      type: 'Savings',
      balance: 5280.42,
      currency: 'USD',
      lastTransaction: '2023-08-15'
    },
    {
      id: 2,
      name: 'Emergency Fund',
      type: 'Savings',
      balance: 10500.00,
      currency: 'USD',
      lastTransaction: '2023-07-28'
    },
    {
      id: 3,
      name: 'Daily Expenses',
      type: 'Expense',
      balance: 850.75,
      currency: 'USD',
      lastTransaction: '2023-08-18'
    },
    {
      id: 4,
      name: 'Stock Portfolio',
      type: 'Investment',
      balance: 25680.30,
      currency: 'USD',
      lastTransaction: '2023-08-10'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
