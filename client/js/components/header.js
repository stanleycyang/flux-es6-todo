'use strict';

import React from 'react';
import TodoActions from '../actions/todo-actions';
import TodoTextInput from './todo-text-input';

export default class Header extends React.Component {
  render() {
    return (
      <header id='header'>
        <TodoTextInput
          id='new-todo'
          placeholder='What needs to be done?'
          onSave={this.onSave}
        />
      </header>
    );
  }

  onSave(text) {
    TodoActions.create(text);
  }
}
