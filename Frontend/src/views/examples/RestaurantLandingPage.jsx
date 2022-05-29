import React from 'react';
import SimpleFooter from '../../components/Footers/SimpleFooter';
import CustomersNavbar from '../../components/Navbars/CustomersNavbar';

import {
  Card,
  Container,
  Row,
  Col,
  CardBody,
} from 'reactstrap';
import styled from 'styled-components';
import MenuDisplay from '../../components/MenuDisplay';

import { useAuthValue } from '../../providers/AuthProvider';
import axios from 'axios';
import { firebase } from '../../services/firebase';
import { baseUrl } from '../../constants';

const RestaurantLandingPage = (props) => {
  const { currentUser, userToken } = useAuthValue();

  const [data, setData] = React.useState();
  const [menu, setMenu] = React.useState();

  const [menuHash, setMenuHash] = React.useState({});

  const [cart, setCart] = React.useState([]);

  const getCart = (childCart) => {
    const tmp_cart = [];
    for (const k in childCart) {
      for (let i = 0; i < childCart[k]; i++) {
        tmp_cart.push(menuHash[k]);
      }
    }
    setCart(tmp_cart);
  };

  const placeOrder = () => {
    const dishes = [];
    cart.forEach((item) => {
      dishes.push(item.dishId);
    });
    axios.post(
      baseUrl + 'customer/placeorder/',
      {
        'restaurant': props.location.state.data,
        'dishes': dishes,
      },
      { headers: { 'Authorization': userToken }},
    ).then((response) => {
      if (response.status === 201) alert('Order Successfully placed');
      else console.log(response.data);
    });
  };


  React.useEffect(() => {
    if (currentUser != null && userToken != null) {
      const dbRef = firebase.database().ref('checkin/' + currentUser.user.username);
      dbRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data !== props.location.state.data) props.history.push('/restaurant-landingpage', { data: data });
        else if (data === '') props.history.push('/home-customers');
      });
      axios.post(
        baseUrl + 'customer/getrestaurantlandingpage/',
        {
          'restaurantId': props.location.state.data,
        },
        { headers: { 'Authorization': userToken }},
      ).then((response) => {
        setData(response.data.restaurant);
        setMenu(response.data.menu);
        const tmp_hash = {};
        response.data.menu.forEach((dish) => {
          tmp_hash[dish.dishId] = dish;
        });
        setMenuHash(tmp_hash);
      });
    }
  }, [userToken, currentUser, props.history, props.location.state.data]);

  const Shape = styled.div`
        background-image: ${data ? 'url("' + data.picLink + '") !important;' : 'linear-gradient(35deg, rgb(251, 99, 64) 0px, rgb(251, 177, 64) 100%) !important;'}
        background-position-x: initial !important;
        background-position-y: initial !important;
        background-size: cover !important;
        background-repeat-x: no-repeat !important;
        background-repeat-y: no-repeat !important;
    `;

  const DescriptionContainer = styled.div`
        width: 100%;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    `;

  return (
    <>
      {
        data ? (
          <>
            <CustomersNavbar cart={cart} placeOrder={placeOrder} />
            <main className="profile-page">
              <section className="section section-shaped section-lg pb-200">
                <Shape className="shape shape-style-1 shape-default alpha-4 bg-gradient-warning">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </Shape>
                <Container className="mt-4">
                  <Card className="card-profile mt-0 shadow">
                    <div className="px-4">
                      <Container>
                        <Row>
                          <Col lg="5">
                            <div className="text-center mt-5">
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
                          <Col lg="7">
                            <DescriptionContainer className={(window.innerWidth > 1000 ? 'border-left' : '') + 'text-left'}>
                              <Row className="justify-content-left px-5">
                                <p style={{ margin: '0' }}>
                                  {data.description}
                                </p>
                              </Row>
                            </DescriptionContainer>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  </Card>
                </Container>
                <div className="separator separator-bottom separator-skew zindex-100">
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
              <section className="section mt--200">
                <Container>
                  <Card className="shadow">
                    <CardBody className="text-center">
                      <MenuDisplay menu={menu} enableAddToCart={true} passCart={getCart} />
                    </CardBody>
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
export default RestaurantLandingPage;