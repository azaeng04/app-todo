import { Component } from '@angular/core';
import { TodoStore } from '../todo/todo.store';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private _todoStore: TodoStore) {}

  get todoStore() {
    return this._todoStore;
  }

  removeCompleted() {
    this._todoStore.removeCompleted();
  }
}
