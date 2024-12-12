import { Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AuthGuard } from './route.guard';
import { NonAuthGuard } from './nonAuth.guard';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminAddUserComponent } from './admin-add-user/admin-add-user.component';
import { AdminEditUserComponent } from './admin-edit-user/admin-edit-user.component';
import { adminAuthGuard } from './admin-auth.guard';
import { adminNonAuthGuard } from './admin-non-auth.guard';

export const routes: Routes = [
    {path:'',component:LogInComponent,canActivate:[NonAuthGuard]},
    {path:'register',component:SignUpComponent},
    {path:'home',component:HomePageComponent,canActivate:[AuthGuard]},
    {path:'profile',component:ProfilePageComponent,canActivate:[AuthGuard]},
    {path:'admin-login',component:AdminLoginComponent,canActivate:[adminNonAuthGuard]},
    {path:'admin-home',component:AdminHomeComponent,canActivate:[adminAuthGuard]},
    {path:'admin-addUser',component:AdminAddUserComponent,canActivate:[adminAuthGuard]},
    {path:'admin-editUser',component:AdminEditUserComponent,canActivate:[adminAuthGuard]}

];


