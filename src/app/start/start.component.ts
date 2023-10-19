import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent {
  inputId: string = '';
  user: any;

  constructor(private authService: UserService, private router: Router) {}

  fetchData(): void {
    if (this.inputId) {
      this.authService.getDpiData(this.inputId).subscribe((data) => {
        // console.log(data);
        this.authService.dpiData = data;
        this.router.navigate(['/info/' + this.inputId]);
      });
    } else {
      console.error('No se ha ingresado un ID válido');
    }
  }
}
