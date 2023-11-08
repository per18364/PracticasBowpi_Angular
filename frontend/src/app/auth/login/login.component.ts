import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
// import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private authService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
    this.form = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  login() {
    // console.log(this.form.value);
    // this.authService.getUser().subscribe((data: any) => {
    //   console.log(data);
    //   let user = data.find(
    //     (user: any) =>
    //       user.email === this.form.value.email &&
    //       user.password === this.form.value.password
    //   );
    //   if (user) {
    //     console.log('Usuario encontrado, sesion iniciada!');
    //     this.router.navigate(['/start']);
    //   } else {
    //     console.log('Usuario no encontrado, correo o contraseña incorrectos');
    //     const emailInput = document.getElementById('email');
    //     const passwordInput = document.getElementById('password');
    //     if (emailInput !== null) {
    //       emailInput.classList.add('is-invalid');
    //     }
    //     if (passwordInput !== null) {
    //       passwordInput.classList.add('is-invalid');
    //     }
    //   }
    // });
    this.authService.login(this.form.value).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        console.log('Inicio de sesión exitoso!');
        this.router.navigate(['/start']);
      },
      (error) => {
        console.log(
          'Error en el inicio de sesión, correo o contraseña incorrectos'
        );
        this.form.controls['email'].setErrors({ incorrect: true });
        this.form.controls['password'].setErrors({ incorrect: true });
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        if (emailInput !== null) {
          emailInput.classList.add('is-invalid');
        }
        if (passwordInput !== null) {
          passwordInput.classList.add('is-invalid');
        }
      }
    );
  }
}
