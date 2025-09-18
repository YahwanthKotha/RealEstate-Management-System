import { Component, OnInit } from '@angular/core';
import { ViewedPropertyService } from 'src/app/buyer/services/viewed-property.service';
import { Property } from 'src/app/buyer/models/property.model';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/buyer/models/user'; // 👈 Make sure the correct path

@Component({
  selector: 'app-viewed',
  templateUrl: './viewed.component.html',
  styleUrls: ['./viewed.component.css']
})
export class ViewedComponent implements OnInit {
  viewedProperties: Property[] = [];
  buyerId!: number;
  user: User | null = null;

  constructor(
    private viewedPropertyService: ViewedPropertyService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.user = JSON.parse(userJson) as User;
      this.buyerId = this.user.id;
      this.loadViewedProperties();
    } else {
      console.warn('User not found. Cannot load viewed properties.');
    }
  }

  loadViewedProperties(): void {
    this.viewedPropertyService.getViewedProperties(this.buyerId).subscribe({
      next: (viewedList: any[]) => {
        this.viewedProperties = viewedList
          .filter(vp => vp.property != null)
          .map(vp => vp.property);
      },
      error: (err: any) => {
        console.error('Failed to load viewed properties', err);
      }
    });
  }
}
