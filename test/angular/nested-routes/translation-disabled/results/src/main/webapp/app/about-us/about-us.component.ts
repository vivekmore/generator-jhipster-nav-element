import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'k-bab-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: [
    './about-us.component.css'
  ]
})
export class AboutUsComponent implements OnInit {

  message: string;

  constructor() {
    this.message = '';
  }

  ngOnInit(): void {
    this.message = 'AboutUsComponent message';
  }

}
