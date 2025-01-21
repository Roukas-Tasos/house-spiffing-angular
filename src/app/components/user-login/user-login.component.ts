import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Credentials } from '../../shared/interfaces/user';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { LoggedInUser } from '../../shared/interfaces/user';


@Component({
  selector: 'app-user-login',
  imports: [ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  userService = inject(UserService);
  router = inject(Router)

  invalidLogin = false

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  onSubmit(){
    const credentials = this.form.value as Credentials;
    this.userService.loginUser(credentials).subscribe({
      next: (response) => {
        const token = response.token;
        console.log(token);
        localStorage.setItem("token", token);

        const decodedTokenSubject = jwtDecode(token)
            .sub as unknown as string;
          console.log(decodedTokenSubject);

          this.userService.user.set({
            fullname: decodedTokenSubject,
            username: decodedTokenSubject
          })
        this.router.navigate(['restricted-content']);
      },
      error: (error) => {
        console.log('Login failed', error);
        this.invalidLogin = true;
      }
    })
  }

}
