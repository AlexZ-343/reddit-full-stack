import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Subject, Subscription} from 'rxjs';
import {Posts, PostStatus} from '../posts/posts.interface';

@Injectable()
export class CreatePostService implements OnInit, OnDestroy {

  private PostSuccessSource = new Subject<boolean>();
  public postSuccess$ = this.PostSuccessSource.asObservable();
  private PostIdSource = new Subject<number>();
  public postId$ = this.PostIdSource.asObservable();
  public post: Posts = {};

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.createPostService.postSuccess$.subscribe((postSuccess: boolean) => {
        this.postSuccess = postSuccess;
      })
    );
  }

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

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => {
      if (sub && !sub.closed) {
        sub.unsubscribe();
      }
    });
  }

}
