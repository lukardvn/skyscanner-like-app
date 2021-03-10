import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-email-confirmed',
  templateUrl: './email-confirmed.component.html',
  styleUrls: ['./email-confirmed.component.css']
})
export class EmailConfirmedComponent implements OnInit {
  constructor(private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.authService.confirmEmail(+id).subscribe();
  }

}
