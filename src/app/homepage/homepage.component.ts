import { Component, OnInit, ViewChild } from '@angular/core';
import { APIService } from '../api.service';

import { DomSanitizer } from  '@angular/platform-browser';
import { searchParam } from '../../assets/searchParam';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  data:object [];
  selftext_arr: object [];
  safeURL:any;
  longURL:string;
  alteredUrl:string;
  matchUrl: any;
  matchThumbnail: any;


  // param:searchParam = {
  //   subreddit: "apple",
  //   numPost: 25,
  //   sortBy: "hot"
  // };
  

  /*queryForm = new FormGroup({
    numPostForm: new FormControl(this.numPost,Validators.required),
    subredditForm: new FormControl(this.subreddit),
    selectSortForm: new FormControl(this.selectSort), 
  });*/

 
  

  thumbnailPlaceholder="../../assets/images/thumbnail_placeholder.jpg";

  constructor(private API: APIService, private _sanitizer: DomSanitizer) { 

  }

  ngOnInit(): void {
    this.API.getRedditHomepage().subscribe((data:any) => {
      //console.log(data);
      //console.log(data.data.children);
      //this.data = data.data.children;
      //console.log(data.data.children[0].data.selftext);
      //console.log(this.data[0]);
      //console.log(this.object);
      /*for(let i=0; i < data.data.children.length; i++){
        //console.log(data.data.children[i].data.selftext_html);
        data.data.children[i].data.selftext_html = this.htmlDecode(data.data.children[i].data.selftext_html);
        this.matchUrl = data.data.children[i].data.domain.match('youtu.be');
        if(this.matchUrl != "null"){
          data.data.children[i].data.url = this.changeYoutubeURL2(data.data.children[i].data.url);
        }
        this.matchUrl = data.data.children[i].data.domain.match('m.youtube');
        if(this.matchUrl != "null"){
          data.data.children[i].data.url = this.changeMYoutubeURL(data.data.children[i].data.url);
        }
        this.matchUrl = data.data.children[i].data.domain.match('youtube');
        if(this.matchUrl != "null"){
          data.data.children[i].data.url = this.changeMYoutubeURL(data.data.children[i].data.url);
        }
        if(data.data.children[i].data.domain == 'gfycat.com'){
          data.data.children[i].data.url = this.changeGfycatUrl(data.data.children[i].data.url);
        }
        //console.log(data.data.children[i].data.thumbnail);
        this.matchThumbnail = data.data.children[i].data.thumbnail.match('redditmedia');
        //console.log(this.matchThumbnail);
        if(this.matchThumbnail == null){
          data.data.children[i].data.thumbnail = "null";
        }
        //console.log(data.data.children[i].data.selftext_html);
      }
      this.data = data.data.children;
      console.log(this.data);*/
      this.cleanData(data);
    })
  }
  returnSearchFormValue(value) {
    return this.getSubredditPost(value.subreddit,value.sortBy,value.numPost);
  }

  getSubredditPost(subreddit:string, selectSort:string, numPost:string){
    /*return this.API.getSubredditPosts(subreddit, selectSort, numPost).subscribe((data:any)=> {
      this.cleanData(data);
    });*/
    return console.log(this.API.getSubredditPosts(subreddit, selectSort, numPost).subscribe((data:any)=> {
      this.cleanData(data);
    }));
  }

  // onSubmit(){
  //   this.subreddit = this.queryForm.value.subredditForm;
  //   console.log("subreddit: " + this.subreddit);
  //   this.numPost = this.queryForm.value.numPostForm;
  //   console.log("numpost: " + this.numPost);
  //   this.selectSort = this.queryForm.value.selectSortForm;
  //   this.getSubredditPost(this.subreddit, this.selectSort,this.numPost);
  //   console.warn(this.queryForm.value);
  // }

  cleanData(data:any){
    for(let i=0; i < data.data.children.length; i++){
      //console.log(data.data.children[i].data.selftext_html);
      data.data.children[i].data.selftext_html = this.htmlDecode(data.data.children[i].data.selftext_html);
      this.matchUrl = data.data.children[i].data.domain.match('youtu.be');
      if(this.matchUrl != "null"){
        data.data.children[i].data.url = this.changeYoutubeURL2(data.data.children[i].data.url);
      }
      this.matchUrl = data.data.children[i].data.domain.match('m.youtube');
      if(this.matchUrl != "null"){
        data.data.children[i].data.url = this.changeMYoutubeURL(data.data.children[i].data.url);
      }
      this.matchUrl = data.data.children[i].data.domain.match('youtube');
      if(this.matchUrl != "null"){
        data.data.children[i].data.url = this.changeMYoutubeURL(data.data.children[i].data.url);
      }
      if(data.data.children[i].data.domain == 'gfycat.com'){
        data.data.children[i].data.url = this.changeGfycatUrl(data.data.children[i].data.url);
      }
      //console.log(data.data.children[i].data.thumbnail);
      this.matchThumbnail = data.data.children[i].data.thumbnail.match('redditmedia');
      //console.log(this.matchThumbnail);
      if(this.matchThumbnail == null){
        data.data.children[i].data.thumbnail = "null";
      }
      //console.log(data.data.children[i].data.selftext_html);
    }
    this.data = data.data.children;
    console.log(this.data);
  }

  htmlDecode(input:any) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  returnSafeURL(videoURL:any){
    videoURL = this.changeYoutubeURL(videoURL);
    return this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(videoURL);
  }

  changeYoutubeURL2(shortURL:string){
    this.longURL = shortURL.replace("youtu.be","youtube.com/embed");
    //this.longURL = shortURL.replace("m.youtube.com","youtube.com")
    return this.longURL = this.longURL.replace("watch?v=","embed/");
  }

  changeYoutubeURL(shortURL:string){
    return this.longURL = shortURL.replace("watch?v=","embed/");
  }
  changeMYoutubeURL(shortURL:string){
    this.longURL = shortURL.replace("m.youtube.com","youtube.com");
    return this.longURL = this.longURL.replace("watch?v=","embed/");
  }

  changeGfycatUrl(original:string){
    return this.alteredUrl = original.replace("https://gfycat.com","https://gfycat.com/ifr");
  }
}
