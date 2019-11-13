export interface Article {
  id: string;
  uid: string;
  author: string; // might be diff from uid - contributions for instance
  post: string;
  photoURL: string;
  tags: string[];
  created: Date;
  updated: Date;
}
