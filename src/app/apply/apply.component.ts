import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryApiService } from '../api-service/country-api.service';
import { CoursesService } from '../courses.service';
import { course } from '../courses-interface';
import { ApiHandlerService } from '../api-service/api-handler.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { AuthService } from '../api-service/auth/auth.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent {

  date : Number = new Date().getFullYear();
  loading: boolean = false;

  countryApiContainer: any;
  stateApiContainer: any;
  courses: course[] = [];
  allApplicantApi: any;
  submitFormText: string = '';

  constructor(private countryApi: CountryApiService, private apiHandler: ApiHandlerService, 
    private coursesservice: CoursesService, private router: Router, private route: ActivatedRoute,
    private authService: AuthService
  ){}

  ngOnInit(){
    window.scrollTo(0, 0);

    this.getCountryApi();
    this.getStateApi();
    this.getCourse();    
  }

  applicantForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password_confirmation: new FormControl('', [Validators.required, Validators.minLength(5)]),
    first_name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    other_name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    last_name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    date_of_birth: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    state_of_origin: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    mode_of_learning: new FormControl('', [Validators.required]),
    course: new FormControl('', [Validators.required]),
  })

  
    onSubmit(data: any) {
      this.loading = true;
      if (this.applicantForm.invalid){        
        Swal.fire({
          title: 'Error!',
          text: 'Enter the right details',
          icon: 'error',
          confirmButtonText: 'Okay'
        })
        this.loading = false;
      } else if(this.applicantForm.value.password != this.applicantForm.value.password_confirmation){
        Swal.fire({
          title: 'Error!',
          text: 'The password and confirmation password do not match',
          icon: 'error',
          confirmButtonText: 'Okay'
        })
        this.loading = false;
      }     
      else {
        
        this.apiHandler.postApplicantApi(data).subscribe({
          next: (response) => {
            const presentUserId = response.id;
          
            Swal.fire({
              title: 'Success!',
              text: 'Submitted successfully',
              icon: 'success',
              confirmButtonText: 'Done'
            });
            console.log(response);
            this.authService.storeToken(response.token);
            // this.applicantForm.reset();
            this.loading = false;
            this.router.navigate([`/admission/${response.data.id}`]);   
          },
          error: (err) => console.log(err),
        })
      }
  }


  getCountryApi(){
    this.countryApi.getCountryApi().subscribe(data => this.countryApiContainer = data)
  }

  getStateApi(){
    this.countryApi.getStateApi().subscribe(data => this.stateApiContainer = data)
  }

  getCourse(){
    this.coursesservice.getCourses().subscribe(course => this.courses = course)
  }  
}
