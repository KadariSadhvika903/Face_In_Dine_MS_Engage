import axios from 'axios';
import React from 'react';

import {
  Card,
  Container,
  Row,
  Col,
  Collapse,
  CardBody,
} from 'reactstrap';
import styled from 'styled-components';

import SimpleFooter from '../../components/Footers/SimpleFooter';
import MenuDisplay from '../../components/MenuDisplay';
import CustomersNavbar from '../../components/Navbars/CustomersNavbar';
import { useAuthValue } from '../../providers/AuthProvider';
import { baseUrl } from '../../constants';

const RestaurantDetails = (props) => {
  const { userToken } = useAuthValue();

  const [data, setData] = React.useState();
  const [menu, setMenu] = React.useState();
  const [collapseState, setCollapseState] = React.useState(false);

  React.useEffect(() => {
    axios.post(
      baseUrl + 'customer/getrestaurantlandingpage/',
      {
        'restaurantId': props.location.state.data,
      },
      { headers: { 'Authorization': userToken }},
    ).then((response) => {
      setData(response.data.restaurant);
      setMenu(response.data.menu);
    });
  }, [userToken, props.location.state.data]);

  const Shape = styled.div`
        background-image: ${data ? 'url("' + data.picLink + '") !important;' : 'linear-gradient(35deg, rgb(251, 99, 64) 0px, rgb(251, 177, 64) 100%) !important;'}
        background-position-x: initial !important;
        background-position-y: initial !important;
        background-size: cover !important;
        background-repeat-x: no-repeat !important;
        background-repeat-y: no-repeat !important;
    `;

  return (
    <>
      {
        data ? (
          <>
            <CustomersNavbar />
            <main className="profile-page">
              <section className="section-profile-cover section-shaped my-0">
                <Shape className="shape shape-style-1 shape-default alpha-4 bg-gradient-warning">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </Shape>
                <div className="separator separator-bottom separator-skew">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    version="1.1"
                    viewBox="0 0 2560 100"
                    x="0"
                    y="0"
                  >
                    <polygon
                      className="fill-white"
                      points="2560 0 2560 100 0 100"
                    />
                  </svg>
                </div>
              </section>
              <section className="section">
                <Container>
                  <Card className="card-profile shadow mt--300">
                    <div className="px-4">
                      <Row className="justify-content-center">
                        <Col className="order-lg-1" lg="4">
                          <div className="card-profile-stats d-flex justify-content-center">
                            <div>
                              <span className="heading">22</span>
                              <span className="description">Check-ins</span>
                            </div>
                            <div>
                              <span className="heading">1</span>
                              <span className="description">Photos</span>
                            </div>
                            <div>
                              <span className="heading">0</span>
                              <span className="description">Comments</span>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <div className="text-center mt-2">
                        <h3>
                          {data.restaurantName}{' '}
                        </h3>
                        <div className="h6 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          Phone Number - {data.phoneNo}
                        </div>
                        <div className="h6 mt-4">
                          <i className="ni business_briefcase-24 mr-2" />
                          Owned By - {data.user.name}
                        </div>
                      </div>
                      <div className="mt-5 py-5 border-top text-center">
                        <Row className="justify-content-center">
                          <Col lg="9">
                            <p>
                              {data.description}
                            </p>
                            <a href="#pablo" id="toggler" onClick={(e) => {
                              e.preventDefault();
                              setCollapseState(!collapseState);
                            }}>
                              Show more
                            </a>
                          </Col>
                        </Row>
                        <Row className="justify-content-left">
                          <Col lg="12">
                            <Collapse isOpen={collapseState}>
                              <Card>
                                <CardBody>
                                  <MenuDisplay menu={menu} />
                                </CardBody>
                              </Card>
                            </Collapse>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Card>
                </Container>
              </section>
            </main>
            <SimpleFooter />
          </>
        ) : null
      }
    </>
  );
};

export default RestaurantDetails;