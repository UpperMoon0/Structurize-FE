import React from 'react';
import PropTypes from 'prop-types';
import Post from './post';

class Posts extends React.Component {
  static propTypes = {
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        author: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  render() {
    return (
      <div>
        {this.props.posts.map((post, index) => (
          <Post
            key={index}
            author={post.author}
            title={post.title}
            content={post.content}
            date={post.date}
          />
        ))}
      </div>
    );
  }
}

export default Posts;