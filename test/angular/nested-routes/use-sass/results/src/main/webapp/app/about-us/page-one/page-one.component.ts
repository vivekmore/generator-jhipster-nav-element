import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'test-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: [
    'page-one.component.scss'
  ]
})
export class PageOneComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'PageOneComponent message';
  }

  ngOnInit() {
  }

}
