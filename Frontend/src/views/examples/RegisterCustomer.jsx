import React, { useEffect, useState } from 'react';

// reactstrap components
import {
  Button,
  Card,
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

// core components
import SimpleFooter from '../../components/Footers/SimpleFooter';
import '../../assets/css/register.css';
import '../../assets/css/profile.css';
import axios from 'axios';
import { useAuthValue } from '../../providers/AuthProvider';
import FileUploader from '../../components/FileUploader';
import { storage } from '../../services/firebase';
import DemoNavbar from '../../components/Navbars/DemoNavbar';
import { baseUrl } from '../../constants';

const Register = (props) => {
  const { currentUser, authenticated, firebaseAuthenticated, userToken } = useAuthValue();

  const [name, setName] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const [email, setEmail] = useState(null);
  const [upi, setUpi] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    if (authenticated) {
      if (currentUser) {
        if (currentUser.user.type === 'Customer') props.history.push('/home-customers');
        else if (currentUser.user.type === 'Restaurant') props.history.push('/restaurant-profile');
      }
    }
  }, [authenticated, firebaseAuthenticated, currentUser, props.history]);

  const register = () => {
    if (!profilePic) {
      alert('Upload a File');
      return;
    }
    if (!name) {
      alert('Enter Name');
      return;
    }
    if (!phoneNo) {
      alert('Enter Phone Number');
      return;
    }
    if (!email) {
      alert('Enter Email ID');
      return;
    }
    if (!upi) {
      alert('Enter UPI ID');
      return;
    }

    const uploadTask = storage.ref(`/customer/${profilePic.name}`).put(profilePic);

    uploadTask.on('state_changed',
      (snapShot) => {
        console.log(snapShot);
      }, (err) => {
        console.log(err);
      }, () => {
        storage.ref('customer').child(profilePic.name).getDownloadURL()
          .then(fireBaseUrl => {
            axios.post(
              baseUrl + 'auth/register/',
              {
                'user': {
                  'name': name,
                  'username': userToken,
                },
                'phoneNo': phoneNo,
                'upiId': upi,
                'picLink': fireBaseUrl,
                'type': 'Customer',
              },
            ).then((response) => {
              if (response.status === 201 || response.status === 200) {
                alert('Registration Successfull');
                window.location.href = window.location.hostname + '/home-customers';
              }
              else console.log(response.data);
            });

          });
      });
  };


  return (
    <>
      <DemoNavbar registration="restaurant" />
      <main>
        <section className="section section-shaped section-lg">
          <div className="shape shape-style-1 bg-gradient-info">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="pt-lg-1 registerCustomer-container">
            <Row className="justify-content-center">
              <Col lg="8">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <Container>
                      <Row>
                        <Col lg="5">
                          <div className="text-center text-muted mb-4">
                            <small>Register yourself</small>
                          </div>
                          <Form role="form">
                            <FormGroup>
                              <InputGroup className="input-group-alternative mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-hat-3" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Name" type="text" onChange={(e) => { setName(e.target.value); }} />
                              </InputGroup>
                            </FormGroup>
                            <FormGroup>
                              <InputGroup className="input-group-alternative mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-mobile-button" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Phone Number" type="text" onChange={(e) => { setPhoneNo(e.target.value); }} />
                              </InputGroup>
                            </FormGroup>
                            <FormGroup>
                              <InputGroup className="input-group-alternative mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-email-83" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Email" type="email" onChange={(e) => { setEmail(e.target.value); }} />
                              </InputGroup>
                            </FormGroup>
                            <FormGroup>
                              <InputGroup className="input-group-alternative mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-badge" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="UPI ID" type="text" onChange={(e) => { setUpi(e.target.value); }} />
                              </InputGroup>
                            </FormGroup>
                            {/* <FormGroup>
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
                                          />
                                      </InputGroup>
                                      </FormGroup> */}
                            {/* <div className="text-muted font-italic">
                                      <small>
                                          password strength:{" "}
                                          <span className="text-success font-weight-700">
                                          strong
                                          </span>
                                      </small>
                                      </div> */}
                            {/* <Row className="my-4">
                                      <Col xs="12">
                                          <div className="custom-control custom-control-alternative custom-checkbox">
                                          <input
                                              className="custom-control-input"
                                              id="customCheckRegister"
                                              type="checkbox"
                                          />
                                          <label
                                              className="custom-control-label"
                                              htmlFor="customCheckRegister"
                                          >
                                              <span>
                                              I agree with the{" "}
                                              <a
                                                  href="#pablo"
                                                  onClick={e => e.preventDefault()}
                                              >
                                                  Privacy Policy
                                              </a>
                                              </span>
                                          </label>
                                          </div>
                                      </Col>
                                      </Row> */}
                            <div className="text-center">
                              <Button
                                className="mt-4"
                                color="primary"
                                type="button"
                                onClick={register}
                              >
                                Create account
                              </Button>
                            </div>
                          </Form>
                        </Col>
                        <Col lg="1" />
                        <Col lg="6">
                          <FileUploader handleFile={setProfilePic} />
                        </Col>
                      </Row>
                    </Container>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
};

export default Register;
