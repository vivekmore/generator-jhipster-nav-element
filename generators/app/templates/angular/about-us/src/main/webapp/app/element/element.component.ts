import {Component, OnInit} from '@angular/core';

@Component({
  selector: '<%=selector%>',
  templateUrl: './<%=templateName%>',
  styleUrls: [
    '<%=scssName%>'
  ]
})
export class <%=componentName%> implements OnInit {

  message: string;

  constructor() {
    this.message = '<%=componentName%> message';
  }

  ngOnInit() {
  }

}
