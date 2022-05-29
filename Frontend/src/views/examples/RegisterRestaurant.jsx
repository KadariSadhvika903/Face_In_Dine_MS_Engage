import React, { useEffect, useState } from 'react';

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

import { useAuthValue } from '../../providers/AuthProvider';
import SimpleFooter from '../../components/Footers/SimpleFooter';

import '../../assets/css/register.css';
import '../../assets/css/restaurantbtn.css';
import axios from 'axios';
import FileUploader from '../../components/FileUploader';
import { storage } from '../../services/firebase';
import DemoNavbar from '../../components/Navbars/DemoNavbar';
import { baseUrl } from '../../constants';

const Register = (props) => {
  const { currentUser, authenticated, firebaseAuthenticated, userToken } = useAuthValue();

  const [name, setName] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [rName, setRName] = useState();
  const [rPhoneNo, setRPhoneNo] = useState();
  const [email, setEmail] = useState();
  const [upi, setUpi] = useState();
  const [description, setDescription] = useState();
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
      alert('Enter Owner Name');
      return;
    }
    if (!phoneNo) {
      alert('Enter Owner Phone Number');
      return;
    }
    if (!rName) {
      alert('Enter Resturant Name');
      return;
    }
    if (!rPhoneNo) {
      alert('Enter Resturant Phone Number');
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

    const uploadTask = storage.ref(`/restaurant/${profilePic.name}`).put(profilePic);

    uploadTask.on('state_changed',
      (snapshot) => {
        console.log(snapshot);
      }, (err) => {
        console.log(err);
      }, () => {
        storage.ref('restaurant').child(profilePic.name).getDownloadURL()
          .then(fireBaseUrl => {
            axios.post(
              baseUrl + 'auth/register/',
              {
                'user': {
                  'name': name,
                  'username': userToken,
                },
                'phoneNo': rPhoneNo,
                'restaurantName': rName,
                'upiId': upi,
                'description': description,
                'picLink': fireBaseUrl,
                'type': 'Restaurant',
              },
            ).then((response) => {
              if (response.status === 201 || response.status === 200) {
                alert('Registration Successfull');
                window.location.href = window.location.hostname + '/restaurant-profile';
              }
              else console.log(response.data);
            });
          });
      },
    );


  };

  return (
    <>
      <DemoNavbar registration="customer" />
      <main>
        <section className="section section-shaped pt-lg-3">
          <div className="shape shape-style-1 bg-gradient-danger">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="pt-lg-7 registerCustomer-container">
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
                                <Input placeholder="Restaurant Owner Name" type="text" onChange={(e) => { setName(e.target.value); }} />
                              </InputGroup>
                            </FormGroup>
                            <FormGroup>
                              <InputGroup className="input-group-alternative mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-mobile-button" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Owner's Phone Number" type="text" onChange={(e) => { setPhoneNo(e.target.value); }} />
                              </InputGroup>
                            </FormGroup>
                            <FormGroup>
                              <InputGroup className="input-group-alternative mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-hat-3" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Restaurant Name" type="text" onChange={(e) => { setRName(e.target.value); }} />
                              </InputGroup>
                            </FormGroup>
                            <FormGroup>
                              <InputGroup className="input-group-alternative mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-mobile-button" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Restaurant Phone Number" type="text" onChange={(e) => { setRPhoneNo(e.target.value); }} />
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
                            <Form>
                              <Input
                                className="form-control-alternative"
                                placeholder="Description of your restaurant..."
                                rows="3"
                                type="textarea"
                                onChange={(e) => { setDescription(e.target.value); }}
                              />
                            </Form>
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
                          {/* <div class="restaurant-btn">
                                      <Button block color="primary" size="lg" type="button">
                                          Upload Images Of Restaurant
                                      </Button>
                                  </div> */}
                          <FileUploader handleFile={setProfilePic} />
                        </Col>
                      </Row>
                    </Container>
                  </CardBody>
                </Card>
                {/* <Button
                  className="btn-2 btn-neutral ml-5"
                  color="default"
                  type="button"
                  style={{ left: "100%", bottom: "50%" }}
                  href="#InputMenu"
                  onClick={e => e.preventDefault()}
                >
                  Next
                </Button> */}
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
