import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/authinterfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;


  get usuario() {
    return { ...this._usuario };
  }


  constructor(
    private http: HttpClient
  ) { }



  registro(name: string, email: string, password: string) {

    const url = `${this.baseUrl}/auth/new`
    const body = { name, email, password }

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(({ ok, token }) => {
          if (ok) {
            localStorage.setItem('token', token!)
          }
        }),
        map(response => response.ok),
        catchError(err => of(err.error.msg))
      )

  }


  login(email: string, password: string) {

    const url = `${this.baseUrl}/auth`
    const body = { email, password }

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(({ ok, token }) => {
          if (ok) {
            localStorage.setItem('token', token!)
          }
        }),
        map(response => response.ok),
        catchError(err => of(err.error.msg))
      )
  }


  validarToken(): Observable<boolean> {

    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-api-key', localStorage.getItem('token') || '')

    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(response => {

          localStorage.setItem('token', response.token!)
          this._usuario = {
            name: response.name!,
            uid: response.uid!,
            email: response.email!
          }

          return response.ok;
        }),
        catchError(err => of(false))
      )
  }



  logout() {
    localStorage.clear();
  }

}
