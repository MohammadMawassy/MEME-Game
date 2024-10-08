import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const credentials = { username, password };
        
        props.login(credentials)
          .then ( () => {})
          .catch( (err) => {
            // if(err.message === "Unauthorized"){
            //   setErrorMessage("Invalid username and/or password");
            //   console.log(errorMessage)
            //   console.log(show)}
            // else
            //   setErrorMessage(err.message);
            setErrorMessage("Invalid username and/or password");
            setShow(true);
          });
    };
  
    return (
      <Row className="justify-content-center px-4 py-1">
      <Col>
        <h1 className="pb-3">Login</h1>

        <Form onSubmit={handleSubmit}>
          <Alert
                dismissible
                show={show}
                onClose={() => setShow(false)}
                variant="danger">
                {errorMessage}
          </Alert>
          <Form.Group className="mb-3 d-flex flex-column align-items-start" controlId="username" >
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={username} placeholder="meme.meme@polito.it"
              onChange={(ev) => setUsername(ev.target.value)}
              required={true}
            />
          </Form.Group>
          <Form.Group className="mb-2 d-flex flex-column align-items-start" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password} placeholder="Enter your password."
              onChange={(ev) => setPassword(ev.target.value)}
              required={true} minLength={6}
            />
          </Form.Group>
          <Button className="mt-3 guess-button btn-light mx-2" type="submit">Login</Button>
             
          <Button className="mt-3 guess-button btn-light mx-2" onClick={() => { navigate('..')}}>Cancel</Button>
        </Form>
      </Col>
    </Row>
    )
  };

  function LoginButton() {
    const navigate = useNavigate();
    return (
      <Button className='nav-button btn-light' variant="btn" onClick={() => navigate('/login')}>Login</Button>
    )
  }

  function LogoutButton(props) {
    return (
      <Button className='nav-button' variant="btn btn-light" onClick={props.logout}>Logout</Button>
    )
  }


  export {LoginForm , LoginButton, LogoutButton}