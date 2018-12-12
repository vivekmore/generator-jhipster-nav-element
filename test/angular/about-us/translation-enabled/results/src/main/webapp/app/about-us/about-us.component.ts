import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'about-us',
  templateUrl: './about-us.component.html',
  styleUrls: [
    'about-us.css'
  ]
})
export class AboutUsComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'AboutUsComponent message';
  }

  ngOnInit() {
  }

}
