import React, { useEffect } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from 'reactstrap';

import { auth, firebase } from '../../services/firebase';
import { useAuthValue } from '../../providers/AuthProvider';
import { baseUrl } from '../../constants';

import SimpleFooter from '../../components/Footers/SimpleFooter';
import GoogleLogo from '../../assets/img/icons/common/google.svg';
import axios from 'axios';
import DemoNavbar from '../../components/Navbars/DemoNavbar';

const Login = (props) => {
  const { currentUser, authenticated, firebaseAuthenticated } = useAuthValue();

  const [email, setEmail] = React.useState();
  const [pass, setPass] = React.useState();

  useEffect(() => {
    if (authenticated) {
      if (currentUser.user.type === 'Customer') props.history.push('/home-customers');
      else if (currentUser.user.type === 'Restaurant') props.history.push('/restaurant-profile');
    }
    else if (firebaseAuthenticated) {
      props.history.push('/register-customer');
    }
  }, [authenticated, firebaseAuthenticated, currentUser, props.history]);

  const handleEmailPasswordSignIn = () => {
    const register = document.getElementById('customCheckLogin').checked;
    if (register) {
      firebase.auth().createUserWithEmailAndPassword(email, pass).then((res) => {
        res.user.getIdToken().then((token) => {
          axios.post(baseUrl+'auth/login/', {},
            { headers: { 'Authorization': token }},
          ).then((response) => {
            if (response.status === 200) {
              if (response.data.user.type === 'Customer') props.history.push('/home-customers');
              else if (response.data.user.type === 'Restaurant') props.history.push('/restaurant-profile');
            }
            else props.history.push('/register-customer');
          });
        });
      });
    }
    else {
      firebase.auth().signInWithEmailAndPassword(email, pass).then((res) => {
        res.user.getIdToken().then((token) => {
          axios.post(baseUrl+'auth/login/', {},
            { headers: { 'Authorization': token }},
          ).then((response) => {
            if (response.status === 200) {
              if (response.data.user.type === 'Customer') props.history.push('/home-customers');
              else if (response.data.user.type === 'Restaurant') props.history.push('/restaurant-profile');
            }
            else props.history.push('/register-customer');
          });
        });
      });
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Signing in with Google');
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(googleProvider).then((res) => {
      res.user.getIdToken().then((token) => {
        axios.post(baseUrl+'auth/login/', {},
          { headers: { 'Authorization': token }},
        ).then((response) => {
          if (response.status === 200) {
            if (response.data.user.type === 'Customer') props.history.push('/home-customers');
            else if (response.data.user.type === 'Restaurant') props.history.push('/restaurant-profile');
          }
          else props.history.push('/register-customer');
        });
      });
    });
  };

  return (
    <>
      <DemoNavbar />
      <main>
        <section className="section section-shaped pt-lg-3">
          <div className="shape shape-style-1 bg-gradient-primary">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">

                  <CardBody className="bg-white px-lg-5 pt-lg-5 pb-lg-1">
                    <div className="text-center text-muted mb-4">
                      <small>Sign in with credentials</small>
                    </div>
                    <Form role="form">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Email" type="email" onChange={(e) => { setEmail(e.target.value); }} />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            autoComplete="off"
                            onChange={(e) => { setPass(e.target.value); }}
                          />
                        </InputGroup>
                      </FormGroup>
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id="customCheckLogin"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheckLogin"
                        >
                          <span>Register for new email</span>
                        </label>
                      </div>
                      <div className="text-center">
                        <Button
                          className="my-3"
                          color="primary"
                          type="button"
                          onClick={handleEmailPasswordSignIn}
                        >
                          Sign in
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                  <CardHeader className="pb-5">
                    <div className="text-muted text-center mb-3">
                      <small>Or sign in with</small>
                    </div>
                    <div className="btn-wrapper text-center">
                      <Button
                        className="btn-neutral btn-icon ml-1"
                        color="default"
                        href="#pablo"
                        onClick={() => handleGoogleSignIn()}
                      >
                        <span className="btn-inner--icon mr-1">
                          <img
                            alt="..."
                            src={GoogleLogo}
                          />
                        </span>
                        <span className="btn-inner--text">Google</span>
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
                {/* <Row className="mt-3">
                  <Col xs="6">
                    <a
                      className="text-light"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <small>Forgot password?</small>
                    </a>
                  </Col>
                  <Col className="text-right" xs="6">
                    <a
                      className="text-light"
                      href=""
                      onClick={e => e.preventDefault()}
                    >
                      <small>Create new account</small>
                    </a>
                  </Col>
                </Row> */}
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
  // }
};

export default Login;
