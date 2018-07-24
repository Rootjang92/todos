import { Pipe, PipeTransform} from '@angular/core';
import { Todo } from './app.component';

@Pipe({
  name: 'todosFilter'
})
export class TodosFilterPipe implements PipeTransform {

  transform(todos: Todo[], state: string): Todo[] {
    console.log(todos, state);
    if ( state === 'Active') {
      return todos.filter(todo => !todo.completed);
    } else if ( state === 'Completed') {
      return todos.filter(todo => todo.completed);
    } else {
      return todos;
    }
  }
}