import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { searchParam } from 'src/assets/searchParam';
import { ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchHeaderComponent implements OnInit, OnChanges {

  // @Input() params: searchParam ={
  //   numPost:25,
  //   subreddit:"",
  //   sortBy:"",
  // }
  params:searchParam = {
    numPost:25,
    subreddit:"",
    sortBy:""
  }

  @Output() outputParam = new EventEmitter<any>();

  sorts = ['best','hot','new','rising','controversial','top','gilded','wiki']

  queryForm = new FormGroup({
    numPostForm: new FormControl(this.params.numPost,Validators.required),
    subredditForm: new FormControl(this.params.subreddit),
    selectSortForm: new FormControl(this.params.sortBy), 
  });

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes:SimpleChanges) {

  }


  onSubmit() {
    this.params.numPost = this.queryForm.get('numPostForm').value;
    this.params.subreddit = this.queryForm.get('subredditForm').value;
    this.params.sortBy = this.queryForm.get('selectSortForm').value;
    console.log(this.params.numPost + " " + this.params.subreddit + " " + 
    this.params.sortBy);
    
    this.outputParam.emit({numPost:this.params.numPost, subreddit:this.params.subreddit, sortBy:this.params.sortBy});

  }
}
