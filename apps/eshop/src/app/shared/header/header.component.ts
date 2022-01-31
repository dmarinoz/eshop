import { Component, OnInit } from '@angular/core';
import { AuthService } from '@empresaurios/users';

@Component({
  selector: 'eshop-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logoutUser(){
    this.authService.logout();
  }

}
