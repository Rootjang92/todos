import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TodosContainerComponent } from './todos-container/todos-container.component';
import { TodosFormComponent } from './todos-form/todos-form.component';
import { TodosListComponent } from './todos-list/todos-list.component';
import { TodosNavComponent } from './todos-nav/todos-nav.component';
import { TodosFooterComponent } from './todos-footer/todos-footer.component';
import { TodosFilterPipe } from './todos-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { TodosArrayService } from './todos-array.service';
// import { NavItemsComponent } from './nav-items/nav-items.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosContainerComponent,
    TodosFormComponent,
    TodosListComponent,
    TodosNavComponent,
    TodosFooterComponent,
    TodosFilterPipe,
    // NavItemsComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule
  ],
  providers: [
 ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
