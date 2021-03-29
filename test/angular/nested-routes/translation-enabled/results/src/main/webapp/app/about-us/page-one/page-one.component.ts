import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'xyz-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: [
    './page-one.component.css'
  ]
})
export class PageOneComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'PageOneComponent message';
  }

  ngOnInit(): void {
  }

}
