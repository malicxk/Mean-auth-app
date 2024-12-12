import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class adminAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private toast: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('admin-email');
      if (token) {
        return true; 
      } else {
        this.toast.error('Not Authorised', '', {
          timeOut: 5000
        });
        this.router.navigate(['/admin-login']); 
        return false;
      }
    } else {
      return false;
    }
  }
}
