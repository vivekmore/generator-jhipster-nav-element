import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'k-bab-page-two',
  templateUrl: './page-two.component.html',
  styleUrls: [
    './page-two.component.css'
  ]
})
export class PageTwoComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'PageTwoComponent message';
  }

  ngOnInit(): void {
  }

}
