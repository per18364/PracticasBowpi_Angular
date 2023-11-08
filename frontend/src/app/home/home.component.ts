import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any;

  constructor(private authService: UserService, private router: Router) {}

  ngOnInit() {}

  start() {
    this.router.navigate(['start/']);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
