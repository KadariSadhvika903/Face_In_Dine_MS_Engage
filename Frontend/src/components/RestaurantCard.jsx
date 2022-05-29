import React from 'react';

import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  CardText,
} from 'reactstrap';
import styled from 'styled-components';

const CustomCardTitle = styled(CardTitle)`
    color: white;
`;

const RestaurantCard = ({ data, onClick }) => {
  return (
    <>
      <div onClick={onClick}>
        <Card inverse>
          <CardImg
            alt="Restaurant image"
            src={data.picLink ? data.picLink : 'https://picsum.photos/318/270'}
            width="100%"
          />
          <CardImgOverlay>
            <CustomCardTitle tag="h3">
              {data.restaurantName}
            </CustomCardTitle>
            <CardText>
              <strong className="text-muted">
                Contact Us - {data.phoneNo}
              </strong>
            </CardText>
          </CardImgOverlay>
        </Card>
      </div>
    </>
  );
};

export default RestaurantCard;