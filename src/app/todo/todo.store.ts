import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable()
export class TodoStore {
  private _todos: Array<Todo> = [];
  public get todos(): Array<Todo> {
    return this._todos;
  }
  public set todos(value: Array<Todo>) {
    this._todos = value;
  }

  constructor() {
    const persistedTodos = JSON.parse(
      localStorage.getItem('angular-todos') || '[]'
    );
    // Normalize back into classes
    this.todos = persistedTodos.map(
      (todo: { _title: string; completed: boolean }) => {
        const ret = new Todo(todo._title);
        ret.completed = todo.completed;
        return ret;
      }
    );
  }

  getTodos() {
    return this.todos;
  }

  private updateStore() {
    localStorage.setItem('angular-todos', JSON.stringify(this.todos));
  }

  private getWithCompleted(completed: boolean) {
    return this.todos.filter((todo: Todo) => todo.completed === completed);
  }

  allCompleted() {
    return this.todos.length === this.getCompleted().length;
  }

  setAllTo(completed: boolean) {
    this.todos.forEach((t: Todo) => (t.completed = completed));
    this.updateStore();
  }

  removeCompleted() {
    this.todos = this.getWithCompleted(false);
    this.updateStore();
  }

  getRemaining() {
    return this.getWithCompleted(false);
  }

  getCompleted() {
    return this.getWithCompleted(true);
  }

  toggleCompletion(todo: Todo) {
    todo.completed = !todo.completed;
    this.updateStore();
  }

  remove(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.updateStore();
  }

  add(title: string) {
    this.todos.push(new Todo(title));
    this.updateStore();
  }
}
