import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from 'src/app/services/user/user.service';
import { NewUser } from 'src/models/NewUser';

@Component({
  selector: 'app-auth-redirect',
  templateUrl: './auth-redirect.component.html',
  styleUrls: ['./auth-redirect.component.css']
})
export class AuthRedirectComponent implements OnInit {
  private myToken;

  constructor(private auth: AuthService,
              private userService: UserService) { }

  ngOnInit(): void {  
    this.auth.user$.subscribe(token => {
      if (token !== null) {
        this.myToken = token;
        /*var metadata = token['https://skyscanner/user_metadata'];
        let newUser = new NewUser({
          ExternalId: token.sub,
          Email: token.email,
          Name: metadata.name,
          Surname: metadata.surname,
          City: metadata.address,
          PhoneNumber: metadata.phoneNumber
        });
  
        this.userService.createUser(newUser).subscribe(result => {
          console.log(result);
        })*/
      } 
      else 
      {
        console.log("nema nista");
      }   
    })  
  }

  putMeIn(){
    let newUser = new NewUser({
      ExternalId: this.myToken.sub,
      Email: this.myToken.email,
      Name: this.myToken['https://skyscanner/user_metadata'].name,
      Surname: this.myToken['https://skyscanner/user_metadata'].surname,
      City: this.myToken['https://skyscanner/user_metadata'].address,
      PhoneNumber: this.myToken['https://skyscanner/user_metadata'].phoneNumber,
      Role: this.myToken['https://skyscanner/roles'][0]
    });

    //ako vrati 0 user vec postoji(login je), ako vrati neki drugi ID(signup je)

    this.userService.createUser(newUser).subscribe(result => {
      console.log(result);
    });
  }
}
