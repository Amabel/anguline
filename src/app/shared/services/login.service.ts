import { Injectable } from '@angular/core';

import { UserImageService } from './user-image.service';
import { UserService } from './user.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: User = {
    username: '',
    avatarUrl: ''
  };

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  constructor(
    public afs: AngularFirestore,
    private userImageService: UserImageService,
    private userService: UserService) {
  }

  login(username: string) {
    this.userImageService.getImageUrl().then(() => {
        this.user.avatarUrl = this.userImageService.userImageUrl;
        this.user.username = username;
        this.usersCollection = this.afs.collection<User>('users', ref => {
          return ref.where('username', '==', username);
        });
        this.users = this.usersCollection.valueChanges();
        this.users.subscribe(result => {
          console.log(result.length);
          if (result.length == 0) {
            this.addUser(this.user);
          } else {
            this.user.avatarUrl = result[0].avatarUrl;
          }
        });
      }
    );
  }

  private addUser(user: User) {
    this.usersCollection.add(user);
  }
}
