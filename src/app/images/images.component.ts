import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/enviroments/enviroments';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
})
export class ImagesComponent {
  @ViewChild('imageRef', { static: false })
  imageElement!: ElementRef;
  user: any;
  imagen1: string = '';
  imagen2: string = '';
  imageWidth: number = 0;
  imageHeight: number = 0;
  scaleFactor: number = 1;
  realWidth: number = 0;

  frontImageFile?: File;
  backImageFile?: File;

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private router: Router
  ) {}

  onImageChange(event: any, type: string) {
    const file = event.target.files[0];
    let reader = new FileReader();
    let vm = this;
    reader.readAsDataURL(file);
    reader.onload = function () {
      if (typeof reader.result === 'string') {
        if (type === 'front') {
          vm.imagen1 = reader.result;
          vm.frontImageFile = file;
        } else if (type === 'back') {
          vm.imagen2 = reader.result;
          vm.backImageFile = file;
        }
        // else
        // vm.imagen1 = reader.result;
      }
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  sendImages() {
    if (this.frontImageFile && this.backImageFile) {
      const formData = new FormData();
      formData.append('front', this.frontImageFile);
      formData.append('back', this.backImageFile);

      // Creamos el objeto de metadatos
      const metadata = {
        metadata: {
          origin: 'portal',
          id: `Test_Jorge_${this.getCurrentDateTime()}`, // Asegúrate de reemplazar `this.user.username` con el username actual del usuario
        },
      };
      formData.append('request', JSON.stringify(metadata));

      this.userService.getImagesData(formData).subscribe(
        (response) => {
          // Aquí puedes redirigir o hacer lo que necesites con la respuesta
          console.log(response);
          this.userService.getDpiData(response.id).subscribe((data) => {
            // console.log(data);
            this.userService.dpiData = data;
            this.router.navigate(['/info/' + response.id]);
          });
        },
        (error) => {
          console.error('Error al enviar las imágenes', error);
        }
      );
    } else {
      console.error('No se han cargado las imágenes');
    }
  }

  // Una función para obtener la fecha y hora actual en el formato requerido
  getCurrentDateTime() {
    const now = new Date();
    return now
      .toISOString()
      .replace(/[^0-9]/g, '')
      .slice(0, 12);
  }
}
