import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { AppState } from '../store/app.state';
import { loginUser } from '../store/actions/user.actions';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
   title:string='LOGIN'
   email:string=''
   password:string=''
   constructor(private route:Router,private toast:ToastrService, private UserService:UserService, private store: Store<AppState>,){}

   postLogin(){
    console.log('Login button clicked');
    if (this.email && this.password) {
      // Dispatch loginUser action with email and password
      this.store.dispatch(loginUser({ username: this.email, password: this.password }));
    } else {
      this.toast.error('All Fields Are Required', '', {
        timeOut: 5000
      });
    }
  }

  
   signUp(){
    this.route.navigate(['/register'])
   }

}
