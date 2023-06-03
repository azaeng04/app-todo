import { Component } from '@angular/core';
import { TodoStore } from '../todo/todo.store';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  constructor(private _todoStore: TodoStore) {}

  get todoStore() {
    return this._todoStore;
  }
}
