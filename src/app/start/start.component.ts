import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  showFront: boolean = false;
  showBack: boolean = false;
  showBowpi: boolean = false;
  showSDK: boolean = false;
  user: any;
  imagen1: string = 'assets/images/dpiFront1.png';
  imagen2: string = 'assets/images/dpiBack1.png';

  constructor(private authService: UserService) {}

  ngOnInit(): void {
    this.authService.getUserData().subscribe((data) => {
      this.user = data;
      console.log(this.user);
    });
  }

  isObject(value: any): boolean {
    return value != null && typeof value === 'object';
  }

  toggleSection(section: string) {
    if (section === 'front') {
      this.showFront = !this.showFront;
    } else if (section === 'back') {
      this.showBack = !this.showBack;
    } else if (section === 'bowpi') {
      this.showBowpi = !this.showBowpi;
    } else if (section === 'sdk') {
      this.showSDK = !this.showSDK;
    }
  }
}
