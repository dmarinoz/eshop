import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '@env/environment';
import * as countriesLib from 'i18n-iso-countries';
import { map } from 'rxjs/operators';
import { UsersFacade } from '../state/users.facade';
declare const require: (arg0: string) => countriesLib.LocaleData;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiURLUsers = environment.apiURL+ 'users';

  constructor(private http: HttpClient, private usersFacade: UsersFacade) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    countriesLib.registerLocale(require('i18n-iso-countries/langs/es.json'));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLUsers);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiURLUsers, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiURLUsers}/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<unknown> {
    return this.http.delete<unknown>(`${this.apiURLUsers}/${userId}`);
  }

  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'es');
  }

  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLUsers}/get/count`)
      .pipe(map((objectValue: any) => objectValue.userCount));
  }

  getCountries(): { id: string; name: string }[] {
    return Object.entries(countriesLib.getNames('es', { select: 'official' })).map((entry) => {
      return {
        id: entry[0],
        name: entry[1]
      };
    });
  }

  initAppSession() {
    this.usersFacade.buildUserSession();
  }

  observeCurrentUser(){
    return this.usersFacade.curentUser$;
  }

  isCurrentUserAuth(){
    return this.usersFacade.isAuthenticated$;
  }

}
