import { useEffect, useState } from 'react';

import { getPosts } from 'services/feed';
import { Post } from 'types/feed';

import './index.css';
import './App.scss';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts()
      .then(setPosts);
  }, []);


  return (
    <div className="App">
      <header>
        <h1>Example Platform Application</h1>
      </header>
      <section>
        <div className="App-content">
          <pre>
            {JSON.stringify(posts, null, 2)}
          </pre>
        </div>
      </section>
    </div>
  );
}

export default App;
