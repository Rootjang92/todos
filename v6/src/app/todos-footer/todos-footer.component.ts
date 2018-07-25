import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Todos } from '../todos.interface';
import { TodosArrayService } from '../todos-array.service';

@Component({
  selector: 'app-todos-footer',
  template: `
    <div class="col-xs-6">
      <label class="i-checks" style="padding-left: 20px">
        <input id="chk-allComplete" type="checkbox" (change)="todosArray.toggleAll($event.target.checked)">
          <i></i><span>Mark all as complete</span>
      </label>
    </div>
    <div class="col-xs-6 text-right" *ngIf="todosArray.todos">
      <button id="btn-removeCompletedTodos" class="btn btn-default btn-xs"
        (click)="todosArray.removeAll()">Clear completed (<span>
          {{ countCom() }}</span>)</button>
      <strong> {{ countLeft() }}</strong>
        {{ countLeft() > 1 ? 'items' : 'item' }} left
    </div>
  `,
  styles: [`
  .i-checks input:checked + i:before {
    top: 4px;
    left: 4px;
    width: 10px;
    height: 10px;
    background-color: #23b7e5;
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
  }`
  ]
})
export class TodosFooterComponent {
  // @Input() todos: Todos[];
  @Output() toggleAll = new EventEmitter();
  @Output() removeAll = new EventEmitter();

  countLeft() {
    const countLeft = this.todosArray.todos.filter(todo => todo.completed).length;
    const activeLeft = this.todosArray.todos.length - countLeft;
    return activeLeft;
  }

  countCom() {
    const countCom = this.todosArray.todos.filter(todo => !todo.completed).length;
    const active = this.todosArray.todos.length - countCom;
    return active;
  }

  constructor(public todosArray: TodosArrayService) { }
}
