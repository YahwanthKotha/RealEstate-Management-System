import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../models/transaction';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../models/user'; // make sure the path is correct

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  user: User | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get user from localStorage (or from AuthService)
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.user = JSON.parse(userJson) as User;
      this.loadTransactions(this.user.id);
    } else {
      console.warn('⚠️ No logged-in user found.');
    }
  }

  loadTransactions(buyerId: number): void {
    this.http.get<Transaction[]>(`http://localhost:8082/api/transactions/buyer/${buyerId}`)
      .subscribe({
        next: (data) => {
          this.transactions = data;
          console.log('📦 Transactions:', data);
        },
        error: (err) => {
          console.error('❌ Error fetching transactions:', err);
        }
      });
  }
}
