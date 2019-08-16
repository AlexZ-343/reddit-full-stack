import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Posts} from './posts.interface';

@Injectable()
export class PostService {

  private PostsListSource = new Subject<Posts[]>();
  private SelectedPostSource = new Subject<Posts>();

  postsList$ = this.PostsListSource.asObservable();
  selectedPost$ = this.SelectedPostSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getPostsList(sortType: string): void {

    const endpoint = 'http://localhost:8080/post/top/page';

    // const requestParams = {
    //   sortType: 'hot'
    // };

    // , {params: requestParams as any}

    this.http.get(endpoint).subscribe((response: List<Posts>) => {
      if (response) {
        this.PostsListSource.next(response);
      }
    });


  }
}
