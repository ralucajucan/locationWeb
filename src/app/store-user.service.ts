import { Injectable } from '@angular/core';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class StoreUserService {
  private user: User = null;
  private userList: User[] = null;

  constructor() { }

  get getUser(){
    return this.user;
  }
  get getUserList(){
    return this.userList;
  }
  setUser(user: User){
    this.user={
      id:user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    };
  }
  setUserList(userList: User[]){
    if (userList == null) {
      this.userList = null;
    } else {
      this.userList=userList.map(
      user =>
      user = {
        id:user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
      }
    );
    }
    
  }
}
