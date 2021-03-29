import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'test-page-two',
  templateUrl: './page-two.component.html',
  styleUrls: [
    './page-two.component.scss'
  ]
})
export class PageTwoComponent implements OnInit {

  message: string;

  constructor() {
    this.message = '';
  }

  ngOnInit(): void {
    this.message = 'PageTwoComponent message';
  }

}
