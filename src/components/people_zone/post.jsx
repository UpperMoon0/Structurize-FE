import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

class Post extends React.Component {
  static propTypes = {
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  };

  render() {
    return (
      <Card>
        <Card.Header>{this.props.author}</Card.Header>
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Text>{this.props.content}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Posted on {this.props.date}</small>
        </Card.Footer>
      </Card>
    );
  }
}

export default Post;