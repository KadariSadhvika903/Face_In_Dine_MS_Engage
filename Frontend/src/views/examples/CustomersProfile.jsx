import React, { useEffect } from 'react';
import { Card, Container, Row, Col } from 'reactstrap';

import CustomersNavbar from '../../components/Navbars/CustomersNavbar';
import SimpleFooter from '../../components/Footers/SimpleFooter';
import { useAuthValue } from '../../providers/AuthProvider';
import axios from 'axios';
import OrderCard from '../../components/OrderCard';
import OrderModal from '../../components/OrderModal';
import { baseUrl } from '../../constants';

const CustomersProfile = () => {
  const { userToken } = useAuthValue();

  const [data, setData] = React.useState();
  const [openModal, setOpenModal] = React.useState(false);
  const [activeData, setActiveData] = React.useState();

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const cardClickHandler = (order) => {
    setActiveData(order);
    setOpenModal(true);
  };

  const settleOrder = (orderId) => {
    axios.post(
      baseUrl+'customer/settlepayment/',
      {
        'orderId': orderId,
      },
      { headers: { 'Authorization': userToken }},
    ).then((response) => {
      if (response.status === 200) alert('Payment Settled');
      else console.log(response.data);
    });
  };

  useEffect(() => {
    axios.get(
      baseUrl+'customer/dashboard/',
      { headers: { 'Authorization': userToken }},
    ).then((response) => {
      if (response.status === 200) {
        setData(response.data);
      }
      else console.log(response.data);
    });
  }, [userToken]);

  return (
    <>
      {
        data ? (
          <>
            <CustomersNavbar />
            <main className="profile-page">
              <section className="section-profile-cover section-shaped my-0">
                <div className="shape shape-style-1 shape-default alpha-4">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
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
              <section className="section pt-1">
                <Container>
                  <Card className="card-profile shadow mt--300">
                    <div className="px-4">
                      <Row className="justify-content-center">
                        <Col className="order-lg-2" lg="5">
                          <div className="card-profile-image">
                            {/* <a href="#pablo" onClick={e => e.preventDefault()}> */}
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={data.customer.picLink}
                              style={{ maxWidth: '250px', objectFit: 'cover', width: '250px', height: '250px', position: 'relative' }}
                            />
                            {/* </a> */}
                          </div>
                        </Col>
                        <Col className="order-lg-1" lg="4">
                          <div className="card-profile-stats d-flex justify-content-center">
                            <div>
                              <span className="heading">22</span>
                              <span className="description">CheckIns</span>
                            </div>
                            <div>
                              <span className="heading">{data.orders.length}</span>
                              <span className="description">Orders</span>
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
                          {data.customer.user.name}
                        </h3>
                        <div className="h6 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          Phone Number - {data.customer.phoneNo}
                        </div>
                      </div>
                      <div className="mt-4 py-4 border-top text-left">
                        {
                          data.orders.filter((order) => {
                            return order.paymentStatus === 'Pending';
                          }).length > 0 ? (
                              <>
                                <h1 className="display-3">Payment Pending</h1>
                                <Row className="justify-content-left">
                                  {
                                    data.orders.filter((order) => {
                                      return order.paymentStatus === 'Pending';
                                    }).map((order) => (
                                      <>
                                        <Col lg="4" className="my-4">
                                          <OrderCard data={order} onClick={() => cardClickHandler(order)} onBtnClick={() => settleOrder(order.orderId)} isCustomer={true} />
                                        </Col>
                                      </>
                                    ))
                                  }
                                </Row>
                              </>
                            ) : null
                        }
                        {
                          data.orders.filter((order) => {
                            return order.paymentStatus === 'Complete';
                          }).length > 0 ? (
                              <>
                                <h1 className="display-3">Payment Completed</h1>
                                <Row className="justify-content-left">
                                  {
                                    data.orders.filter((order) => {
                                      return order.paymentStatus === 'Complete';
                                    }).map((order) => (
                                      <>
                                        <Col lg="4" className="my-4">
                                          <OrderCard data={order} onClick={() => cardClickHandler(order)} isCustomer={true} />
                                        </Col>
                                      </>
                                    ))
                                  }
                                </Row>
                              </>
                            ) : null
                        }
                      </div>
                    </div>
                  </Card>
                </Container>
              </section>
              <OrderModal toggleModal={toggleModal} data={activeData} openModal={openModal} />
            </main>
            <SimpleFooter />
          </>
        ) : null
      }
    </>
  );
};

export default CustomersProfile;
