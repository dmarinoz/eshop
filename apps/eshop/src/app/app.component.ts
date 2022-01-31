import { Component, OnInit } from '@angular/core';
import { UsersService } from '@empresaurios/users';

@Component({
  selector: 'empresaurios-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  constructor(private usersService: UsersService){

  }

  ngOnInit(): void {
      this.usersService.initAppSession();
  }
  title = 'eshop';
}
