// user.effects.ts

import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import * as UserActions from '../actions/user.actions';
import { ToastrService } from 'ngx-toastr'; // Import Toastr service for notifications
import { Router } from '@angular/router'; // Import Router for navigation
import { User } from '../../user.model';

@Injectable()
export class UserEffects {
  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginUser),  //used to filter streams that emitted  based on action type
      switchMap(({ username, password }) => {
        console.log('Attempting login with username:', username);
        return this.userService.login(username, password).pipe(
          map(response => {
            if (response.message === 'Email Not Registered') {
              this.toast.error('Email Not Registered', '', {
                timeOut: 5000
              });
              return UserActions.loginUserFailure({ error: 'Email Not Registered' });
            } else if (response.message === 'Invalid Password') {
              this.toast.error('Invalid Password', '', {
                timeOut: 5000
              });
              return UserActions.loginUserFailure({ error: 'Invalid Password' });
            } else {
              this.toast.success(response.message, '', {
                timeOut: 5000
              });
              localStorage.setItem('crud', response.token);
              localStorage.setItem('email', username);
              this.router.navigate(['/home']); // Navigate to home page on successful login
              console.log('fristnameee', response.user.firstName)
              return UserActions.loginUserSuccess({ user: response.user});
            }
          }),
          catchError(error => {
            console.log(error);
            return of(UserActions.loginUserFailure({ error: error.message }));
          })
        )
      }
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private toast: ToastrService,
    private router: Router
  ) {}
}