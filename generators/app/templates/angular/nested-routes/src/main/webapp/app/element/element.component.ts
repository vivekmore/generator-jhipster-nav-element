import {Component, OnInit} from '@angular/core';

@Component({
  selector: '<%=currentSubComponent.selector%>',
  templateUrl: './<%=currentSubComponent.templateName%>',
  styleUrls: [
    '<%=useSass ? currentSubComponent.scssName : currentSubComponent.cssName%>'
  ]
})
export class <%=currentSubComponent.componentName%> implements OnInit {

  message: string;

  constructor() {
    this.message = '<%=currentSubComponent.componentName%> message';
  }

  ngOnInit() {
  }

}
