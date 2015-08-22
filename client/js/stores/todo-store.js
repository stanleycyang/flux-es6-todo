'use strict';

import AppDispatcher from '../dispatcher/app-dispatcher';
import TodoConstants from '../constants/todo-constants';
import Events from 'events';

const CHANGE_EVENT = 'change';

class TodoStore extends Events.EventEmitter {
  constructor(props) {
    super(props);
    this.todos = {};
    // No need to find this. Array function do it for us
    this.dispatcherIndex = AppDispatcher.register(this.handleAction.bind(this));
  }

  // Arrow function and property initializers makes opt-in bind easy
  handleAction(payload) {
    let action = payload.action;
    let text = '';

    switch(action.actionType) {

      case TodoConstants.TODO_CREATE:
        text = action.text.trim();
        if (text === '') { break; }

        this.create(text);
        this.emitChange();
      break;

      case TodoConstants.TODO_DESTROY:
        this.destroy(action.id);
        this.emitChange();
      break;

    }

    return true; // No errors. Needed by promise in the Dispatcher
  }

  // Creates a todo item
  // @param {string} text TODO content

  create(text) {
    let ID = Date.now();

    this.todos[ID] = {
      id: ID,
      complete: false,
      text: text
    };
  }

  // Destroys a todo item
  // @param {string} id  of the todo item

  destroy(id) {
    delete this.todos[id];
  }

  // Get the entire collection of TODOS
  // @return {object}
  getAll() {
    return this.todos;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  // When the CHANGE_EVENT emitter goes off,
  // Execute this function

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

}

// Export the store
export default new TodoStore();
