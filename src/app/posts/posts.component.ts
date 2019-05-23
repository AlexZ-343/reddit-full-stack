import { Component, OnInit } from '@angular/core';
import {Posts} from './posts.interface';
import {Subscription} from 'rxjs';
import {PostService} from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Posts;
  private subscriptions: Subscription[] = [];

  constructor(
    private postService: PostService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.postService.postsList$.subscribe((postsList: Posts) => {
        this.posts = postsList;
      })
    );
  }

}


