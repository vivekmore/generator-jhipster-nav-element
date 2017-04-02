import {Component, OnInit} from '@angular/core';
import {JhiLanguageService} from 'ng-jhipster';

@Component({
  selector: '<%=selector%>',
  templateUrl: './<%=templateName%>',
  styleUrls: [
    '<%=scssName%>'
  ]
})
export class <%=componentName%> implements OnInit {

  message: string;

  constructor(private jhiLanguageService: JhiLanguageService) {
    this.jhiLanguageService.setLocations(['<%=locationName%>']);
    this.message = '<%=componentName%> message';
  }

  ngOnInit() {
  }

}
