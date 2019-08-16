export interface Posts {
  postID: number;
  username: string;
  subReddit: Subreddit;
  postTitle: string;
  datePosted: number;
  postType: PostType;
  postBody: string;
}

export interface Comments {
  username: string;
  datePosted: number;
  commentText: string;
  lft: number;
  rgt: number;
}

export interface PostStatus {
  postId: number;
  success: boolean;
}

export enum Subreddit {
  aww,
  askReddit,
  books,
  dataIsBeautiful,
  funny,
  gaming,
  history,
  jokes,
  lifeProTips,
  movies,
  music,
  personalFinance,
  science,
  showerThoughts,
  todayILearned
}

export type PostType = 'LINK' | 'TEXT';
