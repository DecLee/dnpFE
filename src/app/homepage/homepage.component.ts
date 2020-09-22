import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { map, flatMap } from 'rxjs/operators';
import { DomSanitizer } from  '@angular/platform-browser';

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
      for(let i=0; i < data.data.children.length; i++){
        //console.log(data.data.children[i].data.selftext_html);
        data.data.children[i].data.selftext_html = this.htmlDecode(data.data.children[i].data.selftext_html);
        if(data.data.children[i].data.domain == 'youtu.be'){
          data.data.children[i].data.url = this.changeYoutubeURL(data.data.children[i].data.url);
        }
        else if(data.data.children[i].data.domain == 'gfycat.com'){
          data.data.children[i].data.url = this.changeGfycatUrl(data.data.children[i].data.url);
        }
        //console.log(data.data.children[i].data.selftext_html);
      }
      this.data = data.data.children;
      console.log(this.data);
    })
    
  }

  htmlDecode(input:any) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  returnSafeURL(videoURL:any){
    videoURL = this.changeYoutubeURL(videoURL);
    return this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(videoURL);
  }

  changeYoutubeURL(shortURL:string){
    return this.longURL = shortURL.replace("youtu.be","youtube.com/embed");
  }

  changeGfycatUrl(original:string){
    return this.alteredUrl = original.replace("https://gfycat.com","https://gfycat.com/ifr");
  }
}
