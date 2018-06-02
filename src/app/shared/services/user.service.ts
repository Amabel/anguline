import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  constructor(public afs: AngularFirestore) {
    // this.usersCollection = afs.collection<User>('users');
  }

  isUserExist(user: User) {
    this.usersCollection = this.afs.collection<User>('users', ref => {
      return ref.where('username', '==', 'aaa');
    });
    this.users = this.usersCollection.valueChanges();
    this.users.subscribe(result => {
      console.log(result.length);
    });
  }

  getUsers() {
    return this.users;
  }

  addUser(user: User) {
    this.usersCollection.add(user);
  }
}
