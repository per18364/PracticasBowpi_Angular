import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
// import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  public form!: FormGroup;
  constructor(
    private newUser: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // this.form = this.createFormGroup();
  }

  ngOnInit(): void {
    if (this.newUser.isLoggedIn()) {
      this.router.navigate(['/start']);
    }
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [Validators.required, Validators.minLength(3), Validators.email],
      ],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  signUp() {
    // this.authService.signUp();
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [Validators.required, Validators.minLength(3), Validators.email],
      ],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  submit() {
    console.log(this.form.value);
    this.newUser.createUser(this.form.value).subscribe((data: any) => {
      // console.log(data);
      console.log('Usuario creado exitosamente');
      this.router.navigate(['/login']);
    });
  }

  get name() {
    return this.form.get('name');
  }
  get lastname() {
    return this.form.get('lastname');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
}
