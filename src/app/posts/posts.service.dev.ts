import { Mastermock, MastermockResponse } from 'ngx-mastermock';
import {HttpResponse} from '@angular/common/http';
import * as PostServiceJSON from './posts.service.dev.json';

export default class PostsServiceDev implements Mastermock {

  registerEndpoints() {
    const result = {};
    result[postSummaryUrl] = this.postSummaryEndpoint;
    return result;
  }

  public postSummaryEndpoint(): MastermockResponse {
    return {
      delay: 1000,
      serverPassthrough: false,
      response: new HttpResponse({
        status: 200,
        body: this.getPostSummary()
      })
    };
  }

  import * as PaymentsServiceJSON from '../../features/payments/payments.service.dev.json';
  myLoadDetailsList =  JSON.parse(JSON.stringify(MyLoadsServiceJSON['my-load-details-list']));

}
