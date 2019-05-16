import { Component, OnInit } from '@angular/core';
import {MastermockResponse} from 'ngx-mastermock';
import {delay} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: MastermockResponse;

  constructor() {
  }

  ngOnInit() {
    this.posts = {
      delay: 1000,
      serverPassthrough: false,
      response: new HttpResponse({
        status: 200,
        body: getPostsSummary()
        }
      })
    };
  }

  getPostsSummary()
  return {
    'status': 'SUCCESS',
    'success': true,
    'data': {
      'results': [{
        'loadNumber': 'LT16838',
        'projectCode': 'IR01',
        'daysSinceDelivery': 3,
        'invoiceReceived': true,
        'newChargeExists': false,
        'documentReceived': true
      }]
    }
  };


}


