export enum MemberType {
  reader = 0,
  writer = 1,
  admin = 2
}

export interface Membership {
  uid: string;
  displayName: string;
  type: MemberType;
}
