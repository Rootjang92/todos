import { Component, OnInit } from '@angular/core';
import { TodosArrayService } from '../todos-array.service';

export type navItem = 'All' | 'Active' | 'Completed';

@Component({
  selector: 'app-todos-container',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <h1 class="title">Todos</h1>
          <app-todos-form></app-todos-form>
          <ng-container *ngIf="todosArray.todos">
            <app-todos-nav [currentItems]="currentItems" (changeTab)="changeTab($event)"></app-todos-nav>
            <app-todos-list [currentItems]="currentItems"></app-todos-list>
            <app-todos-footer></app-todos-footer>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [`
  .title {
    font-size: 80px;
    font-weight: 100;
    text-align: center;
    color: #23b7e5;
    margin-bottom: 30px;
  }
  `
  ]
})
export class TodosContainerComponent {
  navItems = ['All', 'Active', 'Completed' ];
  currentItems = 'All';
  // todos: Todos[];
  content = '';


  constructor(public todosArray: TodosArrayService) {
    // console.log(http);
  }
  changeTab(tab: navItem) {
    this.currentItems = tab;
  }
}
