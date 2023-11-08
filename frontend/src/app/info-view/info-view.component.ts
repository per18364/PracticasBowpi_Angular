import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-info-view',
  templateUrl: './info-view.component.html',
  styleUrls: ['./info-view.component.css'],
})
export class InfoViewComponent implements OnInit {
  // showFront: boolean = false;
  // showBack: boolean = false;
  // showBowpi: boolean = false;
  // showSDK: boolean = false;
  @ViewChild('imageRef', { static: false })
  imageElement!: ElementRef;
  activeTab: string = 'front';
  user: any;
  imagen1: string = '';
  imagen2: string = '';
  imageWidth: number = 0;
  imageHeight: number = 0;
  scaleFactor: number = 1;
  realWidth: number = 0;

  constructor(private authService: UserService) {}

  ngOnInit(): void {
    // this.authService.getUserData().subscribe((data) => {
    //   this.user = data;
    //   console.log(this.user);
    // });
    console.log(this.authService.dpiData);
    this.user = this.authService.dpiData;
    this.imagen1 = 'data:image/png;base64,' + this.user.image.front;
    this.imagen2 = 'data:image/png;base64,' + this.user.image.back;
  }

  isObject(value: any): boolean {
    return value != null && typeof value === 'object';
  }

  onImageLoadFront(event: any): void {
    this.imageWidth = this.imageElement.nativeElement.width;
    this.imageHeight = this.imageElement.nativeElement.height;
    const str = this.user.frontImageSize;
    const numbers = str.match(/\d+/g).map(Number);
    this.realWidth = numbers[0];
    this.scaleFactor = this.imageWidth / this.realWidth;
  }
  onImageLoadBack(event: any): void {
    this.imageWidth = this.imageElement.nativeElement.width;
    this.imageHeight = this.imageElement.nativeElement.height;
    const str = this.user.backImageSize;
    const numbers = str.match(/\d+/g).map(Number);
    this.realWidth = numbers[0];
    this.scaleFactor = this.imageWidth / this.realWidth;
  }

  scaledValue(value: number): number {
    return value * this.scaleFactor;
  }

  onImageChange(event: any, type: string) {
    const file = event.target.files[0];
    let reader = new FileReader();
    let vm = this;
    reader.readAsDataURL(file);
    reader.onload = function () {
      if (typeof reader.result === 'string') {
        if (type === 'front') vm.imagen1 = reader.result;
        else if (type === 'back') vm.imagen2 = reader.result;
        // else
        // vm.imagen1 = reader.result;
      }
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
}
