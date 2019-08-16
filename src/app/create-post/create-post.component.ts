import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Subreddit} from '../posts/posts.interface';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CreatePostService} from './create-post.service';
import {Subscription} from 'rxjs';
import {ReactiveFormsService} from '../shared/reactive-forms.service';
import {HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  postType: Menuitem[];
  selectedType: MenuItem;
  postSuccess: boolean;
  postId: number;
  newPostForm: FormGroup;
  // selectedSubreddit: string;
  keys(): Array<string> {
    const keys = Object.keys(Subreddit);
    return keys.slice(keys.length / 2);
  }

  constructor(
    private createPostService: CreatePostService,
    private formBuilder: FormBuilder,
    private reactiveForms: ReactiveFormsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setNewPostFormControl();
    this.subscriptions.push(
      this.createPostService.postId$.subscribe((postId: number) => {
        this.postId = postId;
      }),
      this.createPostService.postSuccess$.subscribe((postSuccess: boolean) => {
        this.postSuccess = postSuccess;
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
      // const params: [string, any];
      //
      // for (const key of Object.keys(this.newPostForm.controls)) {
      //   params.push(key, this.newPostForm.get(key).value);
      // }
      //
      // params.push('postType', this.selectedType);
      const formJSON = JSON.parse(JSON.stringify(this.newPostForm.getRawValue()));
      formJSON.postType = this.selectedType.label.toUpperCase();
      formJSON = JSON.stringify(formJSON);

      this.createPostService.submitPost(formJSON);
      if (this.postSuccess) {
        this.SharedService.postFormdata(model).subscribe(
          (data) => {
            this.router.navigate(['/PublicPage']);
          },
      }
    } else {
      this.reactiveForms.validateAllFormFields(this.newPostForm);
    }

  }

  // setSubreddit(): void {
  //   this.selectedSubreddit = selectedSubreddit;
  // }

}
