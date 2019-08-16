import { Component, OnInit } from '@angular/core';
import {Posts} from './posts.interface';
import {Subscription} from 'rxjs';
import {PostService} from './posts.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  postList: Posts[];
  private subscriptions: Subscription[] = [];

  constructor(
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit() {
    this.postService.getPostsList();
    this.subscriptions.push(
      this.postService.postsList$.subscribe((postsList: Posts[]) => {
        this.postList = postsList;
      })
    );
  }

}


