import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/api-service/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-qa-login',
  templateUrl: './qa-login.component.html',
  styleUrls: ['./qa-login.component.css']
})
export class QaLoginComponent {
  date : Number = new Date().getFullYear();
  activityLoader: boolean = false;
  loginErrorMessage: string = '';
  loginErrorMessageToggler: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })

  constructor(private router: Router, private authService: AuthService){}

  async onClick(data: any){
    if (this.loginForm.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Enter the correct login details',
        icon: 'error',
        confirmButtonText: 'Okay'
      })
    } 

    try {
      //activate the activity loader
      this.activityLoader = true;

      const response = await firstValueFrom(this.authService.login(data));
  
      //get the token from the response
      const token = response.token;
  
      //store token in local storage
      this.authService.storeToken(token);

      this.authService.getUserRole().subscribe({
        next: (res) => {

          for (let i = 0; i < res.role.length; i++) {
            res.role[i].name === 'admin' ? this.router.navigate(['/auth/qa-admin']) : this.router.navigate([`/admission/${response.user.id}`]);
          }
        
        },
        error: (err) => {
          this.activityLoader = false;
          this.loginErrorMessageToggler = true;
          this.loginErrorMessage = err.error.message;

          console.log(err)
          console.log(err.message)
        },
      })

    } catch (err: any) {
      this.activityLoader = false;
      this.loginErrorMessageToggler = true;
      this.loginErrorMessage = err.error.message;

      console.log(err);
      console.log(err.error.message)
    }
  }
}
