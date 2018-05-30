import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { MessageAreaComponent } from './message-area/message-area.component';

@NgModule({
  declarations: [
    AppComponent,
    FriendListComponent,
    MessageAreaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
