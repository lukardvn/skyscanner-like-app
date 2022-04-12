import { AuthService } from '../../services/auth/auth.service';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  profileJson: string = null;
  isAdmin: boolean = false;

  constructor(public authService: AuthService, //public da bih mogao pristupiti authService-u iz html-a
              public auth: Auth0Service) { }  

  ngOnInit(): void {
    /*this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
    );*/

    this.auth.user$.subscribe(result => {
      if (result !== null) {
        if (result['https://skyscanner/roles'][0] === "admin"){
          this.isAdmin = true;
        }
      }   
    })
  }

}
