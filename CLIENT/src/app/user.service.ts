import { Injectable } from '@angular/core';
import {User} from './user.model'
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';


interface JsonResponse{
  message:string
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http:HttpClient) { }

  addUser(user:User):Observable<any>{
    
    return this.http.post('http://localhost:3000/user/addUser',{user})
    
  }

  checkUser(email:string,password:string):Observable<any>{
    return this.http.post('http://localhost:3000/user/postLogin',{email,password})
  }

  getUserData(email:string | null):Observable<any>{
    return this.http.post('http://localhost:3000/user/userData',{email})
  }

  getUsers():Observable<{message : string,users : User[]}>{
    return this.http.get<{ message : string,users : User[]}>('http://localhost:3000/user/allUsers')
  }

  deletUser(Id:string):Observable<any>{
    return this.http.post('http://localhost:3000/user/deleteUser',{_id:Id})
  }

  editUser(user:any):Observable<any>{
     return this.http.post<{updated : User, message : string}>('http://localhost:3000/user/editUser',{user})
  }

  checkAdmin(email:string,password:string):Observable<any>{
    return this.http.post('http://localhost:3000/user/adminLogin',{email,password})
  }
    
  }

