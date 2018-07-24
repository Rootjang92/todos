import { Component, OnInit } from '@angular/core';
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
    this.http.get<Todo[]>(this.url)
      .subscribe(todos => this.todos = todos);
  }

  private getNextId() {
    return !this.todos.length ? 1 : Math.max(...this.todos.map(({ id }) => id)) + 1;
  }

  addTodo(content: string) {
    const newTodos = {id: this.getNextId(), content, completed: false };
    this.http.post(this.url, newTodos)
      .subscribe(() => this.todos = [newTodos, ...this.todos]);
    this.content = '';
  }

  toggleTodo(id: number) {
    const { completed } = this.todos.find(todo => todo.id === id);
    this.http.patch(`${this.url}/${id}`, { completed: !completed }, {responseType: 'text'})
      .subscribe(() => this.todos = this.todos.map(todo => todo.id === id ?
        Object.assign({}, todo, { completed: !todo.completed}) : todo));
  }

  removeTodo(id: number) {
    this.http.delete(`${this.url}/${id}`, { responseType: 'text' })
      .subscribe(() => this.todos = this.todos.filter(todo => !todo.completed));
  }

  toggleAll(checked: boolean) {
    this.http.patch(this.url, { completed: checked}, {responseType: 'text'})
      .subscribe(() => this.todos = this.todos.map(todo => Object.assign({}, todo, checked === true
        ? { completedte: true} : { completed: false} )));
  }

  removeAll() {
    this.http.delete(`${this.url}/completed`, {responseType: 'text'})
      .subscribe(() => this.todos = this.todos.filter(todo => !todo.completed));
  }

  countLeft() {
    const count = this.todos.filter(todo => todo.completed).length;
    const active = this.todos.length - count;
    return active;
  }

  countCom() {
    const countCom = this.todos.filter(todo => !todo.completed).length;
    const activeCom = this.todos.length - countCom;
    return activeCom;
  }

}


