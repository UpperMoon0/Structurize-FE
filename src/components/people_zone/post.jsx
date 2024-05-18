import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

class Post extends React.Component {
  static propTypes = {
    userName: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    totalFavourites: PropTypes.number.isRequired,
    totalComments: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
  };

  render() {
    return (
      <Card>
        <Card.Header>{this.props.userName}</Card.Header>
        <Card.Body>
          <Card.Title>{this.props.content}</Card.Title>
          <Card.Text>
            Favourites: {this.props.totalFavourites} |
            Comments: {this.props.totalComments}
          </Card.Text>
          <Card.Img variant="bottom" src={this.props.imageUrl} />
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Posted on {this.props.createdAt}</small>
        </Card.Footer>
      </Card>
    );
  }
}

export default Post;