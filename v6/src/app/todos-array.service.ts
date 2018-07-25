import { Injectable } from '@angular/core';
import { Todos } from './todos.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TodosArrayService {
  todos: Todos[];
  url = environment.url;
  content = '';

  constructor (private http: HttpClient) {
    console.log('[url]', this.url);
    this.findAll();
  }

  findAll() {
    this.http.get<Todos[]>(this.url)
     .subscribe(todos => this.todos = todos);
  }

  private getNextId() {
    return !this.todos.length ? 1 : Math.max(...this.todos.map(({ id }) => id)) + 1;
  }

  addTodo(content: string) {
    const newTodo: Todos = {id: this.getNextId(), content, completed: false };
    this.http.post(this.url, newTodo)
      .subscribe(() => this.todos = [newTodo, ...this.todos]);
    this.content = '';
  }

  toggleTodo(id: number) {
    const { completed } = this.todos.find(todo => todo.id === id);
    this.http.patch(`${this.url}/${id}`, { completed: !completed }, { responseType: 'text'})
      .subscribe(() => this.todos = this.todos.map(todo => todo.id === id ?
        Object.assign({}, todo, { completed: !todo.completed}) : todo ));
  }

  removeTodo(id: number) {
    this.http.delete(`${this.url}/${id}`, { responseType: 'text'})
      .subscribe(() => this.todos = this.todos.filter(todo => !todo.completed));
  }

  toggleAll(checked: boolean) {
    this.http.patch(this.url, { completed: checked }, { responseType: 'text'})
      .subscribe(() => this.todos = this.todos.map(todo => Object.assign({}, todo, checked === true ?
        { completed: true } : { completed: false })));
  }

  removeAll() {
    this.http.delete(`${this.url}/completed`, { responseType: 'text'})
      .subscribe(() => this.todos = this.todos.filter(todo => !todo.completed));
  }
}

