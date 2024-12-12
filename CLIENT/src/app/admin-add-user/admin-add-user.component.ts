import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-add-user',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './admin-add-user.component.html',
  styleUrl: './admin-add-user.component.css'
})
export class AdminAddUserComponent {
  title:string='ADD USER...'
  registrationForm:FormGroup

  constructor(private form:FormBuilder,private UserService:UserService, private toaster:ToastrService, private route:Router){
    this.registrationForm= this.form.group({
        firstName:['',Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        mobile: ['', Validators.required],
        password:['',Validators.required]
  })
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
            this.toaster.success('User Added Successfuly', '', {
              timeOut: 5000
            });
            this.route.navigate(['/admin-home']);
          }
        },
        error => {
          console.log('Error:', error.message);
        }
      );
    } else {
      this.toaster.error('All Fields are Required', '', {
        timeOut: 5000
      });
    }
  }

  backTo(){
    this.route.navigate(['/admin-home'])
    return
  }

}
