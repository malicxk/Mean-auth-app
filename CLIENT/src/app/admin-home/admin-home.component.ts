import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { dashboardEditSuccess, dashboardSuccess } from '../store/user.action';
import { getUsersSelector } from '../store/user.selector';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  allUsers: User[] = [];
  user: any = {
    firstName: '', lastName: '', email: '', mobile: 0,
  };

  // @ViewChild('firstNameInput') firstNameInput!: ElementRef<HTMLInputElement> ;
  // @ViewChild('lastNameInput') lastNameInput!: ElementRef<HTMLInputElement>;
  // @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;
  // @ViewChild('mobileInput') mobileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private userService: UserService,
    private toast: ToastrService,
    private store : Store,
    private fb: FormBuilder,
    private route: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchAllUser();
    this.getUsers()
  }

  addUser(): void {
    this.router.navigate(['/admin-addUser']);
  }

  fetchAllUser(): void {
    this.userService.getUsers().subscribe(
      (response: { message: string; users: User[] }) => {
        this.store.dispatch(dashboardSuccess({users : response.users}))
      },
      err => {
        console.log(err);
      }
    );
  }

  getUsers(){
    this.store.select(getUsersSelector).subscribe({
      next : res => {
        this.allUsers = res
      }
    })
  }

  deleteUser(Id: string): void {
    Swal.fire({
      title: 'ARE YOU SURE!',
      text: 'YOU WANT TO DELETE THIS USER?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'CLOSE'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deletUser(Id).subscribe(
          response => {
            this.toast.success(response.message, '', {
              timeOut: 3000
            });
          },
          err => {
            Swal.fire('Error', 'Failed to delete user. Please try again later.', 'error');
          }
        );
      }
    });
  }

  edit(form: HTMLFormElement): void {
    const formData = new FormData(form);
    // console.log(formData);

    let formDataObject: any = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    const formDataJson = JSON.stringify(formDataObject);

    this.userService.editUser(formDataJson).subscribe(
      response => {
        if (response.message === 'User Edited Successfully') {
          this.store.dispatch(dashboardEditSuccess({user : response.updated}))
          this.toast.success('User Edited Successfully', '', {
            timeOut: 3000
          })
          
        }
      },
      err => {
        console.log(err);

      }
    )

  }

  a() {
    
  }

  // edit(): void {
  //   console.log('hii');
  //   console.log('User:', this.user); 

  //     // Perform your edit operation here
  // }

  logOut() {
    localStorage.removeItem('admin-email')
    this.route.navigate(['/admin-login'])
  }
}

