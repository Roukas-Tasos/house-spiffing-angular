import { Component, inject } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatFormField } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../shared/interfaces/user';

@Component({
  selector: 'app-user',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormField, MatInputModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  UserService = inject(UserService)
  // getUser: string = '';  

  form = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      dateOfBirth: new FormControl(''),
      gender: new FormControl(''),
      role: new FormControl('', Validators.required)
    },
    this.passConfirmPassValidator
)

  registrationStatus: {success: boolean, message: string} = {
    success: false,
    message: "Not attempted yet"
  }

  onSubmit(value:any) {
    console.log(value);
    const user: User = {
      firstname: this.form.get('firstname')?.value || '',
      lastname: this.form.get('lastname')?.value || '',
      username: this.form.get('username')?.value || '',
      password: this.form.get('password')?.value || '',
      dateOfBirth: this.form.get('dateOfBirth')?.value || '',
      gender: this.form.get('gender')?.value?.toUpperCase() || '',
      role: this.form.get('role')?.value?.toUpperCase() || ''
    }
    this.UserService.registerUser(user).subscribe({
      next: (response) => {
        console.log("No Errors", response)
        this.registrationStatus = {success: true, message: "User registered successfully!"}
      },
      error: (response) => {
        console.log("Errors", response)
        this.registrationStatus = {success: false, message: "There was an error registering the user!"}
      }
    })
  }

  registerAnother() {
    this.form.reset()
    this.registrationStatus = {success: false, message:"Not attempted yet"}
  }

  resetForm() {
    this.form.reset()
  }

  // check_duplicate_email() {
  //   const username = this.form.get('username')?.value
  //   if (username) {
  //     this.UserService.check_duplicate_email(username).subscribe({
  //       next:(response) => {
  //         console.log(response)
  //         this.form.get('username')?.setErrors(null)
  //       },
  //       error: (response) => {
  //         const message = response.error
  //         console.log(response)
  //         this.form.get('username')?.setErrors({duplicateEmail: true})
  //       }
  //     })
  //   }
  // }

  passConfirmPassValidator(control: AbstractControl):{[key:string]:boolean} | null {
    const form = control as FormGroup
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if(password && confirmPassword && password!=confirmPassword) {
      form.get("confirmPassword")?.setErrors({passwordMismatch: true})
      return {passwordMismatch: true}
    }
    return null
  }
}
