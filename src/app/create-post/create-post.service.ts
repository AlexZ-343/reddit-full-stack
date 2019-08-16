import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Subject} from 'rxjs';
import {PostStatus} from '../posts/posts.interface';

@Injectable()
export class CreatePostService {

  private PostSuccessSource = new Subject<boolean>();
  public postSuccess$ = this.PostSuccessSource.asObservable();
  private PostIdSource = new Subject<number>();
  public postId$ = this.PostIdSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  submitPost(newPostFormData: {}): void {

    const endpoint = 'http://localhost:8080/post/create';

    const headerDict = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // 'Access-Control-Allow-Headers': 'Content-Type',
      // 'Access-Control-Allow-Origin' : '*'
    };

    const headerParams = {
      headers: new HttpHeaders(headerDict),
    };

    this.http.post(endpoint, newPostFormData, headerParams)
      .subscribe((response: PostStatus) => {
        this.PostSuccessSource.next(response.success);
        this.PostIdSource.next(response.postId);
      });

  }



}
