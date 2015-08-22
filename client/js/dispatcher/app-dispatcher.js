'use strict';

import { Dispatcher } from 'flux';

// Create the AppDispatcher class

class AppDispatcher extends Dispatcher {
  handleViewAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
}

// Export the AppDispatcher Object
export default new AppDispatcher();
