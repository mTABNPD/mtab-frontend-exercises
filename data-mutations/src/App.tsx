import { Provider } from 'react-redux';

import { store } from 'store';

import { Greeting } from './Greeting';
import { Login } from './Login';

import './App.css'


function App() {
  return (
    <Provider store={store}>
      <Greeting />
      <Login />
    </Provider>
  );
}

export default App
