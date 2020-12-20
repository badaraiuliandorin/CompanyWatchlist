import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import { AuthService } from '../auth.service';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public async GetAsync<T>(apiFunction: string): Promise<T> {
    const result = await this.http.get(environment.apiUrl + apiFunction, { headers: this.getHeaders() })
      .toPromise();
    return <T>result;
  }

  public async PostAsync<T>(apiFunction: string, body: any): Promise<T> {
    const start = performance.now();
    const result = await this.http.post(environment.apiUrl + apiFunction, body, { headers: this.getHeaders() })
      .toPromise();

    return <T>result;
  }

  public async PutAsync<T>(apiFunction: string, body: any): Promise<T> {
    const result = await this.http.put(environment.apiUrl + apiFunction, body, { headers: this.getHeaders() })
      .toPromise();

    return <T>result;
  }

  public async DeleteAsync<T>(apiFunction: string): Promise<T> {
    const result = await this.http.delete(environment.apiUrl + apiFunction, { headers: this.getHeaders() })
      .toPromise();

    return <T>result;
  }

  private getHeaders(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.authService.getToken());
    let copyHeader = headers;
    return copyHeader;
  }

}
