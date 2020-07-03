import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  private clientId: string = 'a404a5df476b49048fef328909c6eac3';
  private clientSecret: string = '8b226a186abf438c937b84356895595c';
  private scope: string = 'user-top-read%20user-read-private%20user-read-email'; // nao esquecer de usar url encode
  private redirectURI: string = 'http://localhost:4200/callback';
  private responseType: string = 'code';

  constructor(
    private httpClient: HttpClient
  ) { }

  userAuthentication() {
    let route = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=${this.responseType}&redirect_uri=${this.redirectURI}&scope=${this.scope}`;
    window.open(route);
  }

  getTopArtists(access_token) {
    // let test = 'Bearer BQAA7yUY0yeQtc0eoWpvV3sw7-FVhNBKCyp0bBj2nl1KBRUOpznWWqf_EVRHOeicHDXGHnUI7wZXMb-638lMYhlexjOd0IES6DluEe-jqM7zGVVcDusu-MEBiGaiSiT3wMdQxgSWjSmpZnRidRZ4XfOm'
    let route = 'https://api.spotify.com/v1/me/top/artists';
    return this.httpClient.get(route, {
      headers: {
        'Authorization': `${access_token}`
      }
    })
  }

  authorizateCode(userCode) {
    let b64 = btoa(`${this.clientId}:${this.clientSecret}`);

    console.log('userCode service', userCode)
    let bodyParams = `grant_type=authorization_code&code=${userCode}&redirect_uri=${this.redirectURI}`;

    let route = 'https://accounts.spotify.com/api/token';

    return this.httpClient.post(route, bodyParams, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${b64}`
      }
    })
  }

  getUserInfo(access_token) {
    let route = 'https://api.spotify.com/v1/me';
    return this.httpClient.get(route, {
      headers: {
        'Authorization': `${access_token}`
      }
    });
  }

  refreshAccessToken(access_token) {
    console.log('test service')
  }
}
