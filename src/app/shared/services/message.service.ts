import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, merge } from 'rxjs';
import { Message } from '../../models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messagesCollection: AngularFirestoreCollection<Message>;
  messages: Observable<Message[]>;

  constructor(
    public afs: AngularFirestore
  ) {
    this.messagesCollection = afs.collection<Message>('messages');
    this.messages = this.messagesCollection.valueChanges();
  }

  getMessages(myUsername: string, targetUsername: string) {
    return merge(this.queryMessages(myUsername, targetUsername), this.queryMessages(targetUsername, myUsername));
  }

  queryMessages(from: string, to: string) {
    return this.afs.collection<Message>('messages', ref => {
      return ref.where('from_username', '==', from).where('to_username', '==', to).orderBy('sent_at');
    }).valueChanges();
  }

  sendMessage(message: Message) {
    this.messagesCollection.add(message);
  }


}
