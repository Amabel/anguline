import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { LoginService } from '../shared/services/login.service';
import { UserImageService } from '../shared/services/user-image.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  username: string;
  userImageUrl: string;

  constructor(private loginService: LoginService, private ss: UserImageService) { }

  ngOnInit() {
    this.userImageUrl = this.ss.userImageUrl;
  }

  login() {
    // console.log("login button clicked!");
    this.loginService.login();
  }

  private isUsernameInput(): boolean {
    return !!(this.username);
  }

}
