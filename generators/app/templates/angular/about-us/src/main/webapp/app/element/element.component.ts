import {Component, OnInit} from '@angular/core';
<% if (enableTranslation) {  %>import {JhiLanguageService} from 'ng-jhipster';
<% } %>
@Component({
  selector: '<%=selector%>',
  templateUrl: './<%=templateName%>',
  styleUrls: [
    '<%=scssName%>'
  ]
})
export class <%=componentName%> implements OnInit {

  message: string;

  constructor(<% if (enableTranslation) {  %>private jhiLanguageService: JhiLanguageService<%}%>) {
    <% if (enableTranslation) {  %>this.jhiLanguageService.setLocations(['<%=locationName%>']);
    <%}%>this.message = '<%=componentName%> message';
  }

  ngOnInit() {
  }

}
