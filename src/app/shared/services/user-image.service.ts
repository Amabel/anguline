import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class UserImageService {

  userImageUrl: string = '1122';
  requestUrl = 'https://randomuser.me/api/';

  constructor(private http: HttpClient) { }

  getImageUrl() {
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.requestUrl)
        .toPromise()
        .then(
          res => {
            // this.userImageUrl = res.results[0].picture.thumbnail;
            this.userImageUrl = res['results'][0]['picture']['thumbnail'];
            resolve();
          }
        )
    });
    return promise;
  }

}
