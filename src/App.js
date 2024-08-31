import './App.css';
import { Component } from 'react';
import { PostCard } from './components/PostCard';

class App extends Component {
  state = {
    posts: []
  };

  loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');
    
    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url }
    });

    this.setState({ posts: postsAndPhotos });
  }

  // Componente foi montado
  componentDidMount() {
    this.loadPosts();
  }

  // Componente foi atualizado
  componentDidUpdate() {
  }

  // Componente será desmontado
  componentWillUnmount() {
  }

  render() {
    const { posts } = this.state;

    return (
      <section className='container'>
        <div className="posts">
          {posts.map(post => (
            <PostCard  
              key={post.id}
              title={post.title}
              body={post.body}
              cover={post.cover}
            />
          ))}
        </div>
      </section>
    );
  }
}

export default App;
