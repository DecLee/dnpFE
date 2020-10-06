import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }

  getUserInfo(){
    return this.http.get('http://localhost:3000/api/v1/me');
  }

  getRedditHomepage(){
    return this.http.get('https://www.reddit.com/.json');
  }

  getSubredditPosts(subreddit:string, sortBy:string, numPost:string){
    if(subreddit==""){
      return this.http.get('https://www.reddit.com/' + sortBy + '.json?limit=' + numPost);
    }
    else{
      return this.http.get('https://www.reddit.com/r/' + subreddit + '/' + sortBy + '/.json?limit=' + numPost);
    }
    
  }

  htmlDecode(input:any) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }
}
