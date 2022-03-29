import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks/store';
import { getPosts } from 'reducers/feed/actions';
import { selectPosts } from 'reducers/feed/reducer';

import './index.css';
import './App.scss';


function App() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);


  return (
    <div className="App">
      <header>
        <h1>Social Feed 🥳</h1>
      </header>
      <section>
        <div className="App-content">
          <pre>
            {JSON.stringify(posts, undefined, 2)}
          </pre>
        </div>
      </section>
    </div>
  );
}

export default App;
