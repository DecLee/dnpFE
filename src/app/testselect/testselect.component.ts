import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testselect',
  templateUrl: './testselect.component.html',
  styleUrls: ['./testselect.component.css']
})
export class TestselectComponent implements OnInit {
  
  test:string='';

  constructor() { }

  ngOnInit(): void {
  }

}
