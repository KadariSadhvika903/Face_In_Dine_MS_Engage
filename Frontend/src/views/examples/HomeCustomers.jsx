import React, { useEffect } from 'react';
import SimpleFooter from '../../components/Footers/SimpleFooter';
import CustomersNavbar from '../../components/Navbars/CustomersNavbar';

import {
  Container,
} from 'reactstrap';
import { useAuthValue } from '../../providers/AuthProvider';
import axios from 'axios';
import RestaurantCard from '../../components/RestaurantCard';
import styled from 'styled-components';
import { firebase } from '../../services/firebase';
import { baseUrl } from '../../constants';

const MasonryGallaryGrid = styled.div`
    column-count: ${window.innerWidth > 1000 ? '3' : '1'};
    column-gap: 1rem;
    width: 100%;
`;

const MasonryGallaryItem = styled.div`
    break-inside: avoid;
    margin-bottom: 1rem;
`;

const HomeCustomers = (props) => {
  const { currentUser, userToken } = useAuthValue();
  const [data, setData] = React.useState();

  useEffect(() => {
    if (currentUser != null && userToken != null) {
      const dbRef = firebase.database().ref('checkin/' + currentUser.user.username);
      dbRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data !== '') props.history.push('/restaurant-landingpage', { data: data });
      });
      axios.get(
        baseUrl + 'customer/getrestaurants/',
        { headers: { 'Authorization': userToken }},
      ).then((response) => {
        setData(response.data);
      });
    }
  }, [userToken, currentUser, props.history]);

  return (
    <>
      {
        data ? (
          <>
            <CustomersNavbar />
            <main>
              <div className="position-relative">
                <section className="section section-shaped section-lg pb-250">
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
                  <Container className="mt-1">
                    <h1 className="display-3">Restaurant List</h1>
                    <MasonryGallaryGrid className="mt-4">
                      {
                        data.map((restaurant) => (
                          <>
                            <MasonryGallaryItem>
                              <RestaurantCard onClick={() => { props.history.push('/restaurant-details', { data: restaurant.user.username }); }} data={restaurant} />
                            </MasonryGallaryItem>
                          </>
                        ))
                      }
                    </MasonryGallaryGrid>
                  </Container>
                </section>
              </div>
            </main>
            <SimpleFooter />
          </>
        ) : null
      }

    </>
  );
};
export default HomeCustomers;