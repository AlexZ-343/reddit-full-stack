import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Posts} from './posts.interface';

@Injectable()
export class PostService {

  public PostsListSource = new Subject<Posts>();

  postsList$ = this.PostsListSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getPostsList(sortType: string): void {

    const endpoint = '/rest/posts/getPostList?sortType=' + sortType;

    const requestParams = {
      sortType: 'hot'
    };

    this.http.get(endpoint, {params: requestParams as any}).subscribe(response => {
      if (response) {
        this.PostsListSource.next(response['body']['postList']);
      }
    });


  }
}
