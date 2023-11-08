import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public dpiData: any;

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  private userDataSource = new BehaviorSubject({ email: '', password: '' });
  public showMe: boolean = false;
  currentUser = this.userDataSource.asObservable();

  constructor(private http: HttpClient) {}

  getDpiData(id: string) {
    // console.log(`${environment.dpiUrl}?_id=${id}`);
    return this.http.get<any>(`${environment.dpiUrl}?_id=${id}`);
  }

  getImagesData(data: any) {
    return this.http.post<any>(`${environment.imagesUrl}`, data);
  }

  getUserData() {
    const data = this.http.get('assets/jsons/json3.json');
    return data;
  }

  changeData(newUser: { email: string; password: string }) {
    this.userDataSource.next(newUser);
  }
  getUser() {
    return this.http.get('http://localhost:8000/api/user/');
  }
  //ESTO VA PARA REGISTER
  createUser(data: {
    name: string;
    lastname: string;
    email: string;
    password: string;
  }) {
    return this.http.post(environment.url + '/user/', data);
  }
  //ESTO VA PARA LOGIN
  login(data: { email: string; password: string }) {
    const url = environment.url + '/login/';
    return this.http.post(url, data);
  }
}
