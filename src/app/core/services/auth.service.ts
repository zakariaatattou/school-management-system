import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { apiRoutes } from '../constants/routes';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(environment.serverUrl + '/' + apiRoutes.login, { email, password })
  }

  logout() {
    this.userService.clear()
    this.router.navigateByUrl('/login');
  }

}
