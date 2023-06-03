import { Component, Input } from '@angular/core';
import { Todo } from '../todo/todo';
import { TodoStore } from '../todo/todo.store';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input()
  todo: Todo = new Todo('');

  constructor(private _todoStore: TodoStore) {}

  cancelEditingTodo(todo: Todo) {
    todo.editing = false;
  }

  stopEditing(todo: Todo, editedTitle: string) {
    todo.title = editedTitle;
    todo.editing = false;
  }

  updateEditingTodo(todo: Todo, editedTitle: string) {
    editedTitle = editedTitle.trim();
    todo.editing = false;

    if (editedTitle.length === 0) {
      return this._todoStore.remove(todo);
    }

    todo.title = editedTitle;
  }

  editTodo(todo: Todo) {
    todo.editing = true;
  }

  removeCompleted() {
    this._todoStore.removeCompleted();
  }

  toggleCompletion(todo: Todo) {
    this._todoStore.toggleCompletion(todo);
  }

  remove(todo: Todo) {
    this._todoStore.remove(todo);
  }
}
