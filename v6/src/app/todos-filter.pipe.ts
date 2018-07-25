import { Pipe, PipeTransform } from '@angular/core';
import { Todos } from './todos.interface';

@Pipe({
  name: 'todosFilter'
})
export class TodosFilterPipe implements PipeTransform {

  transform(todos: Todos[], state: string): Todos[] {
    console.log(todos, state);
    if ( state === 'Active' ) {
      return todos.filter(todo => !todo.completed );
    } else if ( state === 'Completed') {
      return todos.filter(todo => todo.completed );
    } else {
      return todos;
    }
  }
}
