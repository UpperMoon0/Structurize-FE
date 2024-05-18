import { Form, FormControl, Button, Image, Row, Col, Container } from 'react-bootstrap';

function CreatePost() {
    return (
        <Container className="create-post-container">
            <Row>
                <Col xs={2}>
                    <Image src="path_to_your_image" rounded />
                </Col>
                <Col xs={4}>
                    <FormControl placeholder="Enter text" />
                </Col>
            </Row>
            <Row>
                <Col xs={2}>
                    <Form.Label>Image: </Form.Label>
                </Col>
                <Col xs={2}>
                    <FormControl placeholder="image url" />
                </Col>
                <Col xs={4}>
                    <FormControl type="file" />
                </Col>
                <Col xs={2}>
                    <Button variant="primary">Post</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default CreatePost;