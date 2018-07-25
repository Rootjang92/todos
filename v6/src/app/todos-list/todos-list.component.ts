import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todos } from '../todos.interface';
import { TodosArrayService } from '../todos-array.service';

@Component({
  selector: 'app-todos-list',
  template: `
    <ul id="todo-list" class="list-group" *ngIf="todosArray.todos">
      <li *ngFor= "let todo of ( todosArray.todos  | todosFilter: currentItems )" class="list-group-item">
        <div class="hover-anchor">
          <a class="hover-action text-muted">
            <span class="glyphicon glyphicon-remove-circle pull-right" data-id="{{ todo.id }}"
              (click)="todosArray.removeTodo(todo.id)"></span>
           </a>
          <label class="i-checks">
            <input type="checkbox" id="comhecks" [checked]="todo.completed" (change)="todosArray.toggleTodo(todo.id)"><i></i>
            <span> {{ todo.content }} </span>
          </label>
        </div>
      </li>
    </ul>
  `,
  styles: [`
  .text-muted {
    color: #98a6ad;
  }

  .list-group-item {
    padding-left: 0;
    padding-right: 15px;
    border-color: #e7ecee;
  }

  .hover-anchor {
    height: 30px;
    line-height: 30px;
  }

  .hover-action {
    display: none;
  }

  .list-group-item:hover .hover-action {
    display: block;
    transition: all .2s;
  }

  .hover-action > span {
    font-size: 18px;
    top: 5px;
    cursor: pointer;
  }

  .i-checks > input[type=checkbox] {
    display: none;
  }

  .i-checks {
    width: 94%;
    padding-left: 35px;
    font-weight: normal;
    user-select: none;
    cursor: pointer;
  }

  .i-checks > i {
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-top: -2px;
    margin-right: 5px;
    margin-left: -20px;
    background-color: #fff;
    border: 1px solid #cfdadd;
    vertical-align: middle;
  }

  .i-checks input:checked + i:before {
    top: 4px;
    left: 4px;
    width: 10px;
    height: 10px;
    background-color: #23b7e5;
  }

  .i-checks > i:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background-color: transparent;
    transition: all .1s;
  }
  `]
})
export class TodosListComponent {
  // @Input() todos: Todos[];
  @Input() navItems = ['All', 'Active', 'Completed' ];
  @Input() currentItems = 'All';
  @Output() removeTodo = new EventEmitter<number>();
  @Output() toggleTodo = new EventEmitter<number>();

  constructor(public todosArray: TodosArrayService) { }
}
