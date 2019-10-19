import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import App from './App';
import reducer from './Redux/Reducers';

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['user'],
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer, composeWithDevTools(
  applyMiddleware(thunk),
));
const persistor = persistStore(store);

ReactDOM.render(
  (
    <Provider store={store}>
      <PersistGate loading={'loading...'} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  )
, document.getElementById('root'));
