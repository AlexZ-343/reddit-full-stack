import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {PostCommentsService} from './post-comments.service';
import {ReactiveFormsService} from '../shared/reactive-forms.service';
import {Subscription} from 'rxjs';
import {Posts} from '../posts/posts.interface';
import {CreatePostService} from '../create-post/create-post.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css']
})
export class PostCommentsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  post: Posts = {};
  commentFormControl = new FormControl('', [Validators.required,
    Validators.maxLength(6000)]);

  constructor(
    private createPostService: CreatePostService,
    private postCommentsService: PostCommentsService,
    private reactiveFormsService: ReactiveFormsService
  ) { }

  ngOnInit() {
    this.post = this.createPostService.post;
    // this.subscriptions.push(
    //   this.sharedPostService.postDetails$.subscribe((postDetails: Posts) => {
    //     this.post = postDetails;
    //     console.log(this.post);
    // }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => {
      if (sub && !sub.closed) {
        sub.unsubscribe();
      }
    });
  }

}
