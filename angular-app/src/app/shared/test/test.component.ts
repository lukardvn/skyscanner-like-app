import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log("idemo");
    /*this.http.get<any>("http://localhost:44383/api/Test").subscribe(result => {
      console.log(result);
    });*/
  }

  proba() {
    this.http.get<any>("http://localhost:44383/api/Test").subscribe(result => {
      console.log(result);
    });
  }

}
