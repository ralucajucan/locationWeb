import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDTO } from './model/dto/login';
import { User } from './model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userURL = 'http://localhost:8080/users';
  private loginStatus = false;
  private loginDTO: LoginDTO;

  setLogin(val: boolean) {
    this.loginStatus = val;
    this.loginDTO = {
      email:'',
      password: ''
    }
  }
  get getLogin() {
    return this.loginStatus;
  }
  get getLoginDTO() {
    return this.loginDTO;
  }

  doLogin(email:string,password:string): Observable<LoginDTO> {
    this.loginDTO={
      email:email,
      password:password
    }
    return this.httpClient.post<User>(this.userURL + '/login', this.loginDTO);
  }
  getUserList(email:string,password:string): Observable<User[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' + btoa(email + ':' + password),
      }),
    };
    return this.httpClient.get<User[]>(this.userURL, httpOptions);
  }

  getUserCurent(email:string,password:string): Observable<User> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' + btoa(email + ':' + password),
      }),
    };
    return this.httpClient.get<User>(this.userURL+"/me", httpOptions);
  }
  constructor(private httpClient: HttpClient) {}
}
