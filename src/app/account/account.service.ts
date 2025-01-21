import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../shared/Models/User';
import { BehaviorSubject, map, of, ReplaySubject } from 'rxjs';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseURl = environment.apiUrl;
  private currentUser = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUser.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  // getCurrentUserValue(){
  //   return this.currentUser.value;
  // }

  loadCurrentUser(token: string) {
    if(token === null){
      this.currentUser.next(null);
      return of(null)
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${token}`);

    return this.http.get(this.baseURl+'Account/Get-Current-User', {headers})
    .pipe(map((user:IUser)=>{
      if(user){
        localStorage.setItem('token', user.token);
        this.currentUser.next(user);
      }
    }))
  }

  login(value: any) {
    return this.http.post(this.baseURl + 'Account/Login', value)
      .pipe(
        map((user: IUser) => {
          if (user) {
            localStorage.setItem('token', user.token);
            this.currentUser.next(user);
          }
        })
      )
  }

  register(value: any) {
    return this.http.post(this.baseURl + 'Account/Register', value)
      .pipe(
        map((user: IUser) => {
          if (user) {
            localStorage.setItem('token', user.token);
            this.currentUser.next(user);
          }
        })
      )
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExist(email: string) {
    return this.http.get(this.baseURl + 'Account/Check-Email-Exist?email=' + email);
  }
}
