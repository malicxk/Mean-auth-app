import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppState } from '../store/app.state';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectUser } from '../store/selectors/user.selector';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  userName$: Observable<string | null>;
  constructor(private http:HttpClient, private route:Router, private toast:ToastrService, private store: Store<AppState>){
    // this.user$ = this.store.pipe(select(selectUser));
    this.userName$ = this.store.pipe(select(selectUser), map(user => user ? user.firstName : 'user'))
  }

  getProfile(){
    const token=localStorage.getItem('crud')
    console.log(token);
    
    if(token){
      this.route.navigate(['/profile'])
    }else{
      this.toast.error('Not Authorized','',{
        timeOut:5000
      })
      this.route.navigate(['/'])
    }
  }

  // ngOnInit(): void {
  //   this.user$ = this.store.pipe(select(selectUser))!;
  // }
}
