import axios from 'axios';
import React, { useEffect } from 'react';


import {
  Button,
  Table,
} from 'reactstrap';
import styled from 'styled-components';
import { useAuthValue } from '../providers/AuthProvider';
import { baseUrl } from '../constants.js';

const CustomAddButton = styled(Button)`
    border-radius: 50%;
    height: 3em;
    width: 3em;
    margin: 0;
    padding: 0;
`;

const CustomCell = styled.td`
    display: table-cell;
    text-align: center;
    vertical-align: middle !important;
    padding: 1rem ${window.innerWidth > 1000 ? '' : '0'} !important;
`;

const CustomCellTitle = styled.th`
    display: table-cell;
    text-align: center;
    vertical-align: middle !important;
`;

const MenuDisplay = ({ menu, enableAddToCart = false, passCart = () => { } }) => {
  const { userToken } = useAuthValue();

  const [cuisineData, setCuisineData] = React.useState();
  const [cuisines, setCuisines] = React.useState();
  const [dishesInCart, setDishesInCart] = React.useState({});

  const addDish = (dishId) => {
    const cart = dishesInCart;
    if (cart[dishId] == null) cart[dishId] = 1;
    else cart[dishId]++;
    passCart(cart);
    setDishesInCart(cart);
  };

  const removeDish = (dishId) => {
    const cart = dishesInCart;
    if (cart[dishId] != null && cart[dishId] > 0) cart[dishId]--;
    passCart(cart);
    setDishesInCart(cart);
  };


  useEffect(() => {
    if (menu) {
      const cuisineType = {};
      menu.forEach((dish) => {
        if (cuisineType[dish.cuisine] == null) {
          cuisineType[dish.cuisine] = [];
        }
        cuisineType[dish.cuisine].push(dish);
      });
      setCuisineData(cuisineType);
      setCuisines(Object.keys(cuisineType));
    }
    else {
      axios.get(
        baseUrl + 'restaurant/getmenu/',
        { headers: { 'Authorization': userToken }},
      ).then((response) => {
        const cuisineType = {};
        response.data.forEach((dish) => {
          if (cuisineType[dish.cuisine] == null) {
            cuisineType[dish.cuisine] = [];
          }
          cuisineType[dish.cuisine].push(dish);
        });
        setCuisineData(cuisineType);
        setCuisines(Object.keys(cuisineType));
      });
    }
  }, [userToken, menu]);

  return (
    <>
      {
        cuisineData && cuisines ? (
          <>
            {
              cuisines.map((cuisine) => (
                <div key={cuisine}>
                  <h4>{cuisine}</h4>
                  <div>
                    <Table borderless>
                      <thead>
                        <tr>
                          <th>
                            Dish ID
                          </th>
                          <th>
                            Name
                          </th>
                          <th>
                            Price
                          </th>
                          {enableAddToCart ? <th></th> : null}
                        </tr>
                      </thead>
                      <tbody>
                        {
                          cuisineData[cuisine].map((dish) => (
                            <tr key={dish.dishId}>
                              <CustomCellTitle scope="row">
                                {dish.dishId}
                              </CustomCellTitle>
                              <CustomCell>
                                {dish.name}
                              </CustomCell>
                              <CustomCell>
                                {dish.price}
                              </CustomCell>
                              {
                                enableAddToCart ? (
                                  <CustomCell>
                                    <CustomAddButton
                                      color="success"
                                      onClick={() => addDish(dish.dishId)}
                                      style={{ marginRight: window.innerWidth > 1000 ? '0.5rem' : '0rem' }}
                                    >
                                      <i className="ni ni-fat-add"></i>
                                    </CustomAddButton>
                                    <CustomAddButton
                                      color="danger"
                                      onClick={() => removeDish(dish.dishId)}
                                    >
                                      <i className="ni ni-fat-delete"></i>
                                    </CustomAddButton>
                                  </CustomCell>
                                ) : null
                              }
                            </tr>
                          ))
                        }
                      </tbody>
                    </Table>
                  </div>
                </div>
              ))
            }
          </>
        ) : null
      }
    </>
  );
};

export default MenuDisplay;