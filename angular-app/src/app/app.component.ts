import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth: AuthService) {}
  
  ngOnInit(): void {
    /*this.auth.user$.subscribe(token => {
      const metadata = token;
      console.log(metadata);
    })*/
  }
}
