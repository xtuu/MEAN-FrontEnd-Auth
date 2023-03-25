import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

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



  login(email: string, password: string) {


    const url = `${this.baseUrl}/auth`
    const body = { email, password }

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(response => {
          if (response.ok) {
            this._usuario = {
              name: response.name!,
              uid: response.uid!,

            }
          }
        }),
        map(response => response.ok),
        catchError(err => of(false))
      )

  }


}
