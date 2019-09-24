import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Posts, PostType, Subreddit} from '../posts/posts.interface';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CreatePostService} from './create-post.service';
import {Subscription} from 'rxjs';
import {ReactiveFormsService} from '../shared/reactive-forms.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  postType: MenuItem[];
  selectedType: MenuItem;
  postSuccess: boolean;
  newPostForm: FormGroup;
  post: Posts = {};
  // selectedSubreddit: string;
  keys(): Array<string> {
    const keys = Object.keys(Subreddit);
    return keys.slice(keys.length / 2);
  }

  constructor(
    private createPostService: CreatePostService,
    private formBuilder: FormBuilder,
    private reactiveForms: ReactiveFormsService,
    // private sharedPostService: SharedPostService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setNewPostFormControl();
    this.subscriptions.push(
      this.createPostService.postId$.subscribe((postId: number) => {
        this.post.postID = postId;
      }),
      this.createPostService.postSuccess$.subscribe((postSuccess: boolean) => {
        this.postSuccess = postSuccess;
        if (this.postSuccess) {
          // Construct post object
          this.buildPostObject();
          this.createPostService.post = this.post;
          this.router.navigate(['/post-comments']);
        }
      })
    );
    this.postType = [
      {label: 'link'},
      {label: 'text'}
    ];
    this.selectedType = this.postType[0];
  }

  setNewPostFormControl(): void {
    this.newPostForm = new FormGroup({
      postTitle: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      postBody: new FormControl('', [Validators.maxLength(3000)]),
      subReddit: new FormControl('', [Validators.required])
    });
  }

  formIsValid(target: string): boolean {
    return this[target].valid;
  }

  submitPost(): void {

    if (this.formIsValid('newPostForm')) {
      let formJSON = JSON.parse(JSON.stringify(this.newPostForm.getRawValue()));
      formJSON.postType = this.selectedType.label.toUpperCase();
      formJSON = JSON.stringify(formJSON);

      this.createPostService.submitPost(formJSON);
    } else {
      this.reactiveForms.validateAllFormFields(this.newPostForm);
    }

  }

  buildPostObject(): void {
    this.post.postTitle = this.newPostForm.get('postTitle').value;
    // this.post.datePosted = Date = new Date();
    this.post.postType = this.selectedType.label as PostType;
    this.post.postBody = this.newPostForm.get('postBody').value;
    this.post.subReddit = this.newPostForm.get('subReddit').value;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => {
      if (sub && !sub.closed) {
        sub.unsubscribe();
      }
    });
  }

}
