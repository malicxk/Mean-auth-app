import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { selectUser } from '../store/selectors/user.selector';

@Component({
  selector: 'app-profile-page',
  standalone:true,
  imports:[CommonModule,AsyncPipe],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  
  firstName$: Observable<string | null>;
  lastName$: Observable<string | null>;
  email$: Observable<string | null>;
  mobile$: Observable<string | null>;
  userdata: any;
  pro:string=''
  faEdit = faEdit;

  constructor(private router: Router, private userService: UserService, private http: HttpClient, private store: Store<AppState>) {
    this.firstName$ = this.store.pipe(select(selectUser), map(user => user ? user.firstName : this.userdata.firstName))
    this.lastName$ = this.store.pipe(select(selectUser), map(user => user ? user.lastName : this.userdata.lastName))
    this.email$ = this.store.pipe(select(selectUser), map(user => user ? user.email : this.userdata.email)) 
    this.mobile$ = this.store.pipe(select(selectUser), map(user => user ? user.mobile : this.userdata.mobile))
  }

  ngOnInit(): void {
    this.getData();
  }
    
  getData(): void {
    const email = localStorage.getItem('email');
    this.userService.getUserData(email).subscribe(
      data => {
        console.log(data);
        this.userdata = data.user;
      },
      err => {
        console.log(err);
      }
    );
  }

  onFileSelected(event: any): void {
    const email: string = localStorage.getItem('email') || ''; 
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('email', email);

    this.http.post('http://localhost:3000/user/upload', formData).subscribe(
      (response: any) => {
        console.log('File uploaded successfully:', response);
        this.getData()
      },
      (error: any) => {
        console.error('Error uploading file:', error);
      }
    );
}


  logOut(): void {
    localStorage.removeItem('email')
    localStorage.removeItem('crud')
    this.router.navigate(['/']);
  }
}
