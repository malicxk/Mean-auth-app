import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface JsonResponse{
    message:string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {}

//   checkUser(email:string,password:string):Observable<any>{
//     return this.http.post('http://localhost:3000/user/postLogin',{email,password})
//   }

  login(email: string, password: string): Observable<any> {
    // Assuming your backend API has an endpoint for user login
    return this.http.post<any>(`${this.baseUrl}/postLogin`, { email, password });
  }
}
