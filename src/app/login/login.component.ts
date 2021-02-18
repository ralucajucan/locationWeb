import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorObj } from '../error';
import { User } from '../model/user';
import { StoreUserService } from '../store-user.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  errorMessage: ErrorObj = {
    id: 0,
    message: '',
  };
  gotError: boolean;

  constructor(
    private userService: UserService,
    private storeUser: StoreUserService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  goMaps() {
    this.userService.setLogin(true);
    this.router.navigate(['/map']);
  }

  onSubmit(): void {
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    this.userService.doLogin(email, password).subscribe({
      next: (data) => {
        let user: User;
        let users: User[];
        this.userService.getUserCurent(email, password).subscribe((data) => {
          this.storeUser.setUser(data);
          this.userService.getUserList(email, password).subscribe({
            next: (data) => {
              this.storeUser.setUserList(data);
              this.goMaps();
            },
            error: (data) => {
              this.storeUser.setUserList(null);
              this.goMaps();
            },
          });
        });
      },
      error: (data) => {
        this.errorMessage.id = data.status;
        this.errorMessage.message = data.error.message;
        console.log(data);
        alert(
          'Message:' +
            this.errorMessage.message +
            '\n Status:' +
            this.errorMessage.id
        );
      },
    });
  }

  getStatus(): boolean {
    return this.userService.getLogin;
  }
}
