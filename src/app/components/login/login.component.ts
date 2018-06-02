import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  username: string;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {

  }

  login() {
    this.loginService.login(this.username);
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000);

  }

  private isUsernameInput(): boolean {
    return !!(this.username);
  }

}
