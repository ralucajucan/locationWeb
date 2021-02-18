import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { StoreUserService } from '../store-user.service';
import { UserService } from '../user.service';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  selectedUser:User;

  constructor(
    private userService: UserService,
    private storeUser: StoreUserService,
    private router:Router
    ) { }

  ngOnInit(): void { 
  }

  getStatus():boolean{
    return this.userService.getLogin;
  }
  logOut():void{
    this.userService.setLogin(false);
    this.router.navigate(['/']);
  }
  onSelect(user:User):void{
    this.selectedUser = user;
  }
  getUserList():User[]{
    return this.storeUser.getUserList;
  }
  getUser():User{
    return this.storeUser.getUser;
  }
}
