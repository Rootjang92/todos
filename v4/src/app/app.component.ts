import { Component, OnInit, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  navItems = ['All', 'Active', 'Completed' ];
  currentItems = 'All';
  todos: Todo[];
  content = '';
  url = environment.url;
  constructor(private http: HttpClient) {
    // console.log(http);

  }

  ngOnInit() {
    console.log(this.url);
  //  this.todos = [
  //     {id: 1, content: 'HTML', completed: true},
  //     {id: 2, content: 'CSS', completed: true},
  //     {id: 3, content: 'JS', completed: false}
  //   ];
  this.http.get<Todo[]>(this.url) // client와 server가 다를 때. get은 url만 주면 된다. 타입 맞춰줘야 한다.
    .subscribe(todos => this.todos = todos);
  }

  private getNextId(): number {
    return !this.todos.length ? 1 : Math.max(...this.todos.map(({ id }) => id)) + 1;
  }

  inputTodo(content: string) {
    const newTodos = { id: this.getNextId(), content, completed: false };
    this.http.post(this.url, newTodos)
      .subscribe(() => this.todos = [newTodos, ...this.todos]);
    // console.log(newTodos);
    // this.todos = [newTodos, ...this.todos];
    this.content = '';
  }

  toggleTodo(id: number) {
    // this.todos = this.todos.map(todo => todo.id === id ? Object.assign({}, todo, { completed: !todo.completed}) : todo);
    const { completed } = this.todos.find(todo => todo.id === id); // find : 조건에 부합하는 첫번째 요소 리턴
    this.http.patch(`${this.url}/${id}`, {completed: !completed}, {responseType: 'text'})
      .subscribe(() => this.todos = this.todos.map(todo => todo.id === id ? Object.assign({}, todo, { completed: !todo.completed}) : todo));
  }

  removeTodo(id: number) {
    // this.todos = this.todos.filter(todo => todo.id !== id);
    this.http.delete(`${this.url}/${id}`, {responseType: 'text'}) // response type 맞춰줘야.
      .subscribe(() => this.todos = this.todos.filter(todo => todo.id !== id));
  }

  toggleAll(checked: boolean) {
    // this.todos = this.todos.map(todo => Object.assign({}, todo, checked === true ? { completed: true } : { completed: false }));
    this.http.patch(this.url, {completed: checked}, {responseType: 'text'})
      .subscribe(() => this.todos = this.todos.map(todo =>
        Object.assign({}, todo, checked === true ? { completed: true } : { completed: false })));
  }

  removeAll() {
    // this.todos = this.todos.filter(todo => !todo.completed);
    this.http.delete(`${this.url}/completed`, {responseType: 'text'})
      .subscribe(() => this.todos = this.todos.filter(todo => !todo.completed));
  }

  countLeft() {
    const count = this.todos.filter(todo => todo.completed).length;
    const active = this.todos.length - count;
    return active;
  }

  countCom() {
    const countL = this.todos.filter(todo => !todo.completed).length;
    const activeL = this.todos.length - countL;
    return activeL;
  }
}

