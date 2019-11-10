import { Membership } from './membership.model';

export interface User {
  uid: string;
  email: string;
  membership?: Membership;
  photoURL?: string;
  displayName?: string;
  description?: string;
}
