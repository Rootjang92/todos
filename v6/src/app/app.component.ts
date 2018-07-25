import { Component } from '@angular/core';
import { TodosArrayService } from './todos-array.service';

@Component({
  selector: 'app-root',
  template: `
    <app-todos-container>todos</app-todos-container>
  `,
  // providers: [TodosArrayService] // Component provider
})
export class AppComponent {
  // 의존성 주입
  constructor() {}
}

