import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})

export class SignUpComponent {
   title:string='SIGN UP HERE...'
   registrationForm:FormGroup

   constructor(private route:Router, private UserService:UserService,private fb:FormBuilder, private toaster:ToastrService){
    this.registrationForm= this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.email],
      mobile:['',Validators.required],
      password:['',Validators.required],
    })
   }
   
    

   logIn(){
    this.route.navigate(['/'])
   }

   onSubmit() {
    if (this.registrationForm.valid) {
      const user = this.registrationForm.value;
      this.UserService.addUser(user).subscribe(
        response => {
          if (response.message === 'Email Already Exists') {
            this.toaster.error('Email already exists', '', {
              timeOut: 5000
            });
            return
          } else {
            console.log('Message from service:', response.message);
            this.toaster.success('User Registered Successfuly', '', {
              timeOut: 5000
            });
            this.route.navigate(['/']);
          }
        },
        error => {
          console.log('Error:', error.message);
        }
      );
    } else {
      this.toaster.error('All Field is Required', '', {
        timeOut: 5000
      });
    }
  }
  }
