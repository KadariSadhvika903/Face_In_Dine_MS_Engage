import React from 'react';

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

import '../../assets/css/register.css';
import RestaurantsNavbar from '../../components/Navbars/RestaurantsNavbar';
import SimpleFooter from '../../components/Footers/SimpleFooter';
import MenuDisplay from '../../components/MenuDisplay';
import styled from 'styled-components';
import axios from 'axios';
import { useAuthValue } from '../../providers/AuthProvider';
import { baseUrl } from '../../constants';

const Box = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const HeightedCol = styled(Col)`
  height: 25em;
`;

const InputMenu = () => {
  const { userToken } = useAuthValue();

  const [name, setName] = React.useState();
  const [price, setPrice] = React.useState();
  const [type, setType] = React.useState();

  const addDish = () => {
    if (!name) {
      alert('Enter Owner Name');
      return;
    }
    if (!price) {
      alert('Enter Price');
      return;
    }
    if (!type) {
      alert('Enter Type');
      return;
    }

    axios.post(
      baseUrl + 'restaurant/addish/',
      {
        'name': name,
        'price': price,
        'cuisine': type,
      },
      { headers: { 'Authorization': userToken }},
    ).then((response) => {
      if (response.status === 201) {
        alert('Dish Added');
      }
      else console.log(response.data);
    });

  };

  return (
    <>
      <RestaurantsNavbar />
      <main>
        <section className="section section-shaped section-lg">
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
                            <small>Input Dish Details</small>
                          </div>
                          <Form role="form">
                            <FormGroup>
                              <InputGroup className="input-group-alternative mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-hat-3" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Dish Name" type="text" onChange={(e) => { setName(e.target.value); }} />
                              </InputGroup>
                            </FormGroup>
                            <FormGroup>
                              <InputGroup className="input-group-alternative mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-money-coins" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Price in rupees" type="number" onChange={(e) => { setPrice(e.target.value); }} />
                              </InputGroup>
                            </FormGroup>
                            <FormGroup>
                              <InputGroup className="input-group-alternative mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-archive-2" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Type" type="text" onChange={(e) => { setType(e.target.value); }} />
                              </InputGroup>
                            </FormGroup>
                            <div className="text-center">
                              <Button
                                className="mt-4"
                                color="primary"
                                type="button"
                                onClick={addDish}
                              >
                                Input Item
                              </Button>
                            </div>
                          </Form>
                        </Col>
                        <Col lg="1" />
                        <HeightedCol lg="6">
                          <Box>
                            <MenuDisplay />
                          </Box>
                        </HeightedCol>
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

export default InputMenu;
