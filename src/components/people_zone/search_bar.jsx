import { Form, FormControl, Button, Row, Col } from 'react-bootstrap';

function SearchBar() {
  return (
    <Form className="d-flex flex-row-reverse">
      <Row>
        <Col xs={8}>
          <FormControl type="text" placeholder="Search"/>
        </Col>
        <Col xs={3}>
          <Button variant="outline-success">Search</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchBar;