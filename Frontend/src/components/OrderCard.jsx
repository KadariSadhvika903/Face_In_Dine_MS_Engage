import React, { useEffect } from 'react';

import {
  Button,
  Card,
  CardBody,
} from 'reactstrap';

const OrderCard = ({ data, onClick, onBtnClick, isCustomer = false }) => {
  const [status, setStatus] = React.useState();

  useEffect(() => {
    if (!isCustomer) {
      if (data.orderStatus === 'Pending') setStatus('warning');
      else setStatus('primary');
    }
    else if (data.paymentStatus === 'Pending') setStatus('warning');
    else setStatus('primary');
  }, [data, isCustomer]);

  return (
    <Card className="card-lift--hover shadow border-0">
      <CardBody className="py-5">
        <div onClick={() => onClick()}>

          <div className={`icon icon-shape icon-shape-${status} rounded-circle mb-4`}>
            {
              isCustomer ? (
                data.paymentStatus === 'Pending' ? (<i className="ni ni-time-alarm" />) : (<i className="ni ni-check-bold" />)
              ) : data.orderStatus === 'Pending' ? (<i className="ni ni-time-alarm" />) : (<i className="ni ni-check-bold" />)
            }
          </div>
          <h6 className={`text-${status} text-uppercase`}>
            #{data.orderId}
          </h6>
          <p className="lead">
            {
              isCustomer ? (
                <>
                  <strong>Restaurant:</strong> {data.restaurant.restaurantName} <br />
                </>
              ) : (
                <>
                  <strong>Customer:</strong> {data.customer.user.name} <br />
                </>
              )
            }
            <strong>Phone No:</strong> {isCustomer ? data.restaurant.phoneNo : data.customer.phoneNo}
          </p>
          <span>
          </span>
        </div>
        {
          (!isCustomer && data.orderStatus === 'Pending') || (isCustomer && data.paymentStatus === 'Pending') ? (
            <span>
              <Button
                className="mt-4"
                color={status}
                href="#"
                onClick={onBtnClick}
              >
                {
                  isCustomer ? ('Settle Payment') : ('Complete Order')
                }
              </Button>
            </span>
          ) : null
        }
      </CardBody>
    </Card>
  );
};

export default OrderCard;