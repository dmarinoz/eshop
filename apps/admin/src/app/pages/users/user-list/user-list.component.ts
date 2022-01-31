import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User, UsersService } from '@empresaurios/users';

@Component({
  selector: 'admin-users-list',
  templateUrl: './user-list.component.html',
  styles: []
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getUsers();
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: '¿Quiere eliminar este usuario?',
      header: 'Eliminar Usaurio',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userId).subscribe(
          () => {
            this._getUsers();
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Usuario eliminado'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Usuario no eliminado'
            });
          }
        );
      }
    });
  }

  updateUser(userid: string) {
    this.router.navigateByUrl(`users/form/${userid}`);
  }

  getCountryName(countryKey: string) {
    if (countryKey) return this.usersService.getCountry(countryKey);
  }

  private _getUsers() {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
