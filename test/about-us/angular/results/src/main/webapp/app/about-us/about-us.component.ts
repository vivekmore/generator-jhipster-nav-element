import {Component, OnInit} from '@angular/core';
import {JhiLanguageService} from 'ng-jhipster';

@Component({
  selector: 'jhi-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: [
    'about-us.scss'
  ]
})
export class AboutUsComponent implements OnInit {

  message: string;

  constructor(private jhiLanguageService: JhiLanguageService) {
    this.jhiLanguageService.setLocations(['about-us']);
  }

  ngOnInit() {
  }

}
