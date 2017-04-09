import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: [
    'about-us.scss'
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
