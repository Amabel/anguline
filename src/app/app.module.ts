import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FriendListComponent } from './components/home/friend-list/friend-list.component';
import { MessageAreaComponent } from './components/home/message-area/message-area.component';
import { LoginComponent } from './components/login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { LoginService } from './shared/services/login.service';
import { UserImageService } from './shared/services/user-image.service';
import { UserService } from './shared/services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    FriendListComponent,
    MessageAreaComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    SplitButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'anguline'),
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence()
  ],
  providers: [
    LoginService,
    UserImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
