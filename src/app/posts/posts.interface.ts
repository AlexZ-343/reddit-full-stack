export interface Posts {
  title: string;
  comments: number;
  upvotes: number;
  timeSinceSubmission: number;
  submittedBy: string;
  subreddit: Subreddit;

}

export type Subreddit = 'r/pics' | 'r/AskReddit' | 'r/funny';
