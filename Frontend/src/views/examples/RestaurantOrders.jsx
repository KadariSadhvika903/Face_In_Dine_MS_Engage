import axios from 'axios';
import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

import RestaurantsNavbar from '../../components/Navbars/RestaurantsNavbar';
import SimpleFooter from '../../components/Footers/SimpleFooter';
import OrderCard from '../../components/OrderCard';
import OrderModal from '../../components/OrderModal';
import { useAuthValue } from '../../providers/AuthProvider';
import { baseUrl } from '../../constants';

const RestaurantOrders = () => {
  const { userToken } = useAuthValue();

  const [openModal, setOpenModal] = React.useState(false);
  const [activeData, setActiveData] = React.useState();
  const [data, setData] = React.useState();

  useEffect(() => {
    axios.get(
      baseUrl + 'restaurant/getorders/',
      { headers: { 'Authorization': userToken }},
    ).then((response) => {
      setData(response.data);
    });
  }, [userToken]);

  const updateOrder = (orderId) => {
    axios.post(
      baseUrl + 'restaurant/updateorder/',
      {
        'orderId': orderId,
      },
      { headers: { 'Authorization': userToken }},
    ).then((response) => {
      if (response.status === 200) alert('Updated Order Status');
      else console.log(response.data);
    });
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const cardClickHandler = (order) => {
    setActiveData(order);
    setOpenModal(true);
  };

  return (
    <>
      {
        data ? (
          <>
            <RestaurantsNavbar />
            <main>
              <div className="position-relative">
                <section className="section section-shaped section-lg pb-250">
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
                  <Container className="mt-4">
                    {
                      data.filter((order) => {
                        return order.orderStatus === 'Pending';
                      }).length > 0 ? (
                          <>
                            <h1 className="display-3">Pending Orders</h1>
                            <Row className="mx-2 mt-4">
                              {
                                data.filter((order) => {
                                  return order.orderStatus === 'Pending';
                                }).map((order) => (
                                  <Col lg="4" className="my-4" key={order.orderId}>
                                    <OrderCard data={order} onClick={() => cardClickHandler(order)} onBtnClick={() => updateOrder(order.orderId)} />
                                  </Col>
                                ))
                              }
                            </Row>
                          </>
                        ) : null
                    }
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
                <section className="section section-lg pt-lg-0 mt--200">
                  <Container className="mt-4">
                    {
                      data.filter((order) => {
                        return order.orderStatus === 'Complete';
                      }).length > 0 ? (
                          <>
                            <h1 className="display-3">Completed Orders</h1>
                            <Row className="mx-2 mt-4">
                              {
                                data.filter((order) => {
                                  return order.orderStatus === 'Complete';
                                }).map((order) => (
                                  <Col lg="4" className="my-4" key={order.orderId}>
                                    <OrderCard data={order} onClick={() => cardClickHandler(order)} />
                                  </Col>
                                ))
                              }
                            </Row>
                          </>
                        ) : null
                    }
                  </Container>
                </section>
              </div>
              <OrderModal toggleModal={toggleModal} data={activeData} openModal={openModal} />
            </main>
            <SimpleFooter />
          </>
        ) : null
      }
    </>
  );
};

export default RestaurantOrders;