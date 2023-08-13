import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';

const Login = () => {
  return (
    <Container>
        <Form className="row justify-content-center col-6 m-auto">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control type="email"   placeholder="password" />
          </Form.Group>
          <Button variant="success">Success</Button>{' '}
        </Form>
    </Container>
  );
};

export default Login;
