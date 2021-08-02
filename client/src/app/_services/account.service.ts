import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<User>(1);
  // ReplySubject is a special kind of Obserables and are 
  // a kind of buffer which stores the objects and any time 
  // the subscriber subscribes emmits the last value stored.   
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User ) => {
         const user = response;
         if(user){
           localStorage.setItem('user', JSON.stringify(user));
           this.currentUserSource.next(user);
         }
      })
    )
  }

  register(model: any){
    return this.http.post<User>(this.baseUrl +'account/register', model).pipe(
      map((user: User) => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
       
      })
    )
   
  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user); 
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(undefined);
  }
}
