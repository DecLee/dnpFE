import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-subreddit',
  templateUrl: './subreddit.component.html',
  styleUrls: ['./subreddit.component.css']
})
export class SubredditComponent implements OnInit {

  sortBy: string;
  numPost: number;
  subreddit: string;

  constructor(private API: APIService) { }

  ngOnInit(): void {

  }

}
