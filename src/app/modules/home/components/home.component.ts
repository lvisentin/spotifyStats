import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public access_token: string;
  public userCode: string;
  public topArtists;

  constructor(
    private ar: ActivatedRoute,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    if (this.ar.snapshot.queryParams['code']) {
      this.userCode = this.ar.snapshot.queryParams['code']
      if (!localStorage.getItem('access_token')) {
        this.homeService.authorizateCode(this.userCode).subscribe(
          response => {
            console.log('response', response)
            this.access_token = `${response['token_type']} ${response['access_token']}`
            localStorage.setItem('access_token', this.access_token)
          }
        );
        this.homeService.getUserInfo(this.access_token).subscribe(
          user => {
            console.log('user ', user)
          }
        )
      } else {
        this.access_token = localStorage.getItem('access_token')
        console.log('test', this.access_token)
        this.homeService.getUserInfo(this.access_token).subscribe(
          user => {
            console.log('user ', user)
          }
        )
      }
    }
  }

  authorization() {
    this.homeService.userAuthentication();
  }

  getTopArtists() {
    this.homeService.getTopArtists(this.access_token).subscribe(
      userTopArtists => {
        console.log(userTopArtists)
        this.topArtists = userTopArtists['items']
      }
    );
  }

  refreshAccessToken() {
    // this.homeService.refreshAccessToken(this.access_token)
  }

}
