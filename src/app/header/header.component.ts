import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username: Object;
  isLoggedIn: boolean = false;


  constructor(private API: APIService) { }

  ngOnInit(): void {
    this.API.getUserInfo().subscribe(data => {
      this.username = data;
      console.log(this.username);
    })
  }


}
