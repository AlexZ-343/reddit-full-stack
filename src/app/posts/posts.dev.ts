import { HttpResponse } from '@angular/common/http';

import { Mastermock } from 'ngx-mastermock/ngx-mastermock';
import { MastermockResponse } from 'ngx-mastermock/ngx-mastermock';

export default class implements Mastermock {

  registerEndpoints() {
    const result = {};
    result['/rest/posts/getPostList?sortType=hot'] = this.getPostsList();
    return result;
  }

  public getPostsList(): MastermockResponse {
    return {
      response: new HttpResponse({
        status: 200,
        body: {
          postList: [
            {
              title: 'Cheap clickbait that made frontpage',
              comments: '253',
              upvotes: '1053',
              timeSinceSubmission: '3700',
              submittedBy: 'u/karmafarmer',
              subreddit: 'r/funny'
            },
            {
              title: 'Became a US citizen today!',
              comments: '735',
              upvotes: '7323',
              timeSinceSubmission: '9230',
              submittedBy: 'u/proudtobeamerican',
              subreddit: 'r/pics'
            }
          ]
        }
      })
    };
  }
}
