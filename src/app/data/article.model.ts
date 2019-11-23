export interface Block {
  data: any;
  type: string;
}

export interface Article {
  uid: string;
  author: string; // might be diff from uid - contributions for instance
  title: string;
  post: Block[];
  photoURL?: string;
  tags?: string[];
  created: Date;
  updated: Date;
}
