import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  constructor(private route:Router, private toast:ToastrService, private UserService:UserService){}

   email1='';
   password1=''

   

   postLogin(){
    if(this.email1 && this.password1){
      this.UserService.checkAdmin(this.email1,this.password1).subscribe(
        response=>{
          if(response.message=='Email Not Matched'){
            this.toast.error('Invalid Email','',{
              timeOut:5000
            })
          }else if(response.message=='Invalid Password'){
            this.toast.error('Invalid Password','',{
              timeOut:5000
            })
          }else{
            this.toast.success(response.message,'',{
              timeOut:5000
            })
            console.log(response.token);
            
            localStorage.setItem('admin-email',this.email1)
              this.route.navigate(['/admin-home'])
            
          }
        },
        error=>{
          console.log(error);
          
        }
      )
    }else{
      this.toast.error('All Fields Are Required','',{
        timeOut:5000
      })
    }

}
}
