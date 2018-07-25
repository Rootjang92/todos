import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
// import { Todos } from '../todos.interface';
// import { TodosArrayService} from '../todos-array.service';

@Component({
  selector: 'app-todos-nav',
  template: `
  <ul class="nav nav-xs nav-pills">
    <li *ngFor="let navItem of navItems" [class.active]="navItem === currentItems" (click)="changeTab.emit(navItem)">
      <a>{{ navItem }}</a>
    </li>
  </ul>
  `,
  styles: [`
  a, a:focus, a:hover {
    color: inherit;
    text-decoration: none;
  }

  .nav {
    margin: 15px;
  }

  .nav.nav-xs > li > a {
    padding: 4px 10px;
  }

  .nav-pills > li.active > a {
    color: #fff !important;
    background-color: #23b7e5;
  }

  .nav-pills>li.active>a:active,
  .nav-pills>li.active>a:focus,
  .nav-pills>li.active>a:hover {
    background-color: #19a9d5;
  }

  .nav > li {
    cursor: pointer;
  }

`]
})
export class TodosNavComponent {
  // @Input() todos: Todos[];
  @Input() navItems = ['All', 'Active', 'Completed'];
  @Input() currentItems = 'All';
  @Output() changeTab = new EventEmitter();
}
