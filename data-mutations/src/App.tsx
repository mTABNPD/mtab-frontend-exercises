import { Provider } from 'react-redux';

import { store } from 'store';

import { Greeting } from './Greeting';

import './App.css'

function App() {
  return (
    <Provider store={store}>
      <Greeting />
    </Provider>
  );
}

export default App
