import React from 'react';
import PropTypes from 'prop-types';
import Post from './post';

class Posts extends React.Component {
  static propTypes = {
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        userName: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        totalFavourites: PropTypes.number.isRequired,
        totalComments: PropTypes.number.isRequired,
        imageUrl: PropTypes.string,
      })
    ).isRequired,
  };

  render() {
    return (
      <div>
        {this.props.posts.map((post, index) => (
          <Post
            key={index}
            userName={post.userName}
            content={post.content}
            createdAt={post.createdAt}
            totalFavourites={post.totalFavourites}
            totalComments={post.totalComments}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
    );
  }
}

export default Posts;