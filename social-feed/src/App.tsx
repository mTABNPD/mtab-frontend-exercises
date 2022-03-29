import { useEffect } from 'react';

import { Feed } from 'components/feed';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import { getPosts, likePost } from 'reducers/feed/actions';
import { selectPosts } from 'reducers/feed/reducer';

import 'bootstrap/dist/css/bootstrap.min.css';
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
          <Feed
            posts={posts}
            title="Recent Activity"
            onPostLike={(postId) => dispatch(likePost(postId))}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
