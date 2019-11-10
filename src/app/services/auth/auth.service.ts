import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of, combineLatest } from 'rxjs';
import { switchMap, map  } from 'rxjs/operators';
import { auth } from 'firebase';
import { User } from 'src/app/data/user.model';
import { Membership, MemberType } from 'src/app/data/membership.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.getAuthState();
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  async login(email: string, password: string) {
    const credential = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    this.updateUserData(credential.user);
  }

  async register(email: string, password: string) {
    const credential = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    const x = this.sendEmailVerification().then(() => {
      this.updateUserData(credential.user);
    });
    x.then(res => {
      console.log(res);
    });
  }

  async sendEmailVerification() {
    await this.afAuth.auth.currentUser.sendEmailVerification();
    this.router.navigate(['/']);
  }

  private updateUserMembership(user: User, membership: Membership) {
    user.membership = membership;
    this.updateUserData(user);
  }

  private async updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const memberRef: AngularFirestoreDocument<Membership> = this.afs.doc(`memberships/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    const memberData: Membership = {
      uid: user.uid,
      displayName: user.displayName,
      type: MemberType.reader
    };

    memberRef.valueChanges().subscribe(membership => {
      memberData.type = membership.type || MemberType.reader;
      memberRef.set(memberData, { merge: true });
    });

    return userRef.set(data, { merge: true });
  }

  private getAuthState() {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.getUserInfo(user);
        } else {
          return of(null);
        }
      })
    );
  }

  private getUserInfo(userInfo: User): Observable<User>  {
    const user$ = this.afs.doc<User>(`users/${userInfo.uid}`).valueChanges();
    const membership$ = this.afs.doc<Membership>(`memberships/${userInfo.uid}`).valueChanges();

    return combineLatest([user$, membership$]).pipe(
      map(([user, membership]) => {
        return {
          ...user,
          membership
        };
      })
    );
  }
}
