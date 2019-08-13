import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RegistrationStatus} from './register-modal.interface';
import {Subject} from 'rxjs';

@Injectable()
export class SignupService {

  // public PostsListSource = new Subject<Posts>();
  //
  // postsList$ = this.PostsListSource.asObservable();

  private RegisterStatusSource = new Subject<boolean>();
  public registerStatus$ = this.RegisterStatusSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  checkUsername(username: string): boolean {

    // find the right endpoint name for this
    const endpoint = 'http://localhost:8080/usernames/getUsername?userName=' + username;

    const requestParams = {
      userName: username
    };

    this.http.get(endpoint, {params: requestParams as any}).subscribe(response => {
      if (response) {
        // this.PostsListSource.next(response['body']['postList']);
        return true;
      }
    });

    return false;


  }

  submitRegistration(signupFormData: string): void {

    const endpoint = 'http://localhost:8080/register/submitRegistration';

    const headerDict = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // 'Access-Control-Allow-Headers': 'Content-Type',
      // 'Access-Control-Allow-Origin' : '*'
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    this.http.post(endpoint, signupFormData, requestOptions)
      .subscribe((response: RegistrationStatus) => {
      this.RegisterStatusSource.next(response.status);
    }
    // , err => { console.log(err); throw '';}
    );

  }
}
