export interface User{
    _id:string,
    firstName:string,
    lastName:string,
    email:string,
    mobile:number,
    password:string,
    profile ?:string
  }