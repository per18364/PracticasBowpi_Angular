import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public show!: boolean;
  constructor(private authService: UserService, private router: Router) {}

  ngOnInit() {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    console.log('Cerraste sesión');
  }
}
