import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TodosArrayService } from '../todos-array.service';

@Component({
  selector: 'app-todos-form',
  template: `
    <input id="input-todo" class="form-control input-lg" placeholder="What needs to be done?"
      autofocus [(ngModel)]="content" (keyup.enter)="handleKeyup()">
  `,
  styles: [`
  .form-control {
    box-shadow: none;
    border-color: #e7ecee;
  }

  .form-control:focus {
    border-color: #23b7e5;
  }
  `]
})
export class TodosFormComponent {
  content = '';
  // @Output() addTodo = new EventEmitter<string>();

  constructor(public todosArray: TodosArrayService) { }

  handleKeyup() {
    if (this.content) {
      this.todosArray.addTodo(this.content);
      this.content = '';
    }
  }
}
