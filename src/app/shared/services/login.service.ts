import { Injectable } from '@angular/core';

import { UserImageService } from './user-image.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private userImageService: UserImageService) { }

  login() {
    // if no image
    this.generateRandomUserImage();
  }

  private generateRandomUserImage() {

    this.userImageService.getImageUrl().then(() => {
        console.log(this.userImageService.userImageUrl);
      }
    );

  }

  // TODO: angularfire connections

}
