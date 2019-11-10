export enum Membership {
  reader = 0,
  writer = 1,
  admin = 2
}

export interface User {
  uid: string;
  email: string;
  membership: Membership;
  photoURL?: string;
  displayName?: string;
  description?: string;
}
