import React from 'react';
// // reactstrap components
import {
  Button,
  Modal,
  Table,
} from 'reactstrap';

const CartModal = (props) => {


  if (props.data) {
    const dishes = props.data;

    const quantity = {};
    const disDish = [];
    let totalPrice = 0;
    dishes.forEach((dish) => {
      if (quantity[dish.dishId]) quantity[dish.dishId]++;
      else {
        disDish.push(dish);
        quantity[dish.dishId] = 1;
      }
      totalPrice += dish.price;
    });

    return (
      <>
        <Modal
          className="modal-dialog-centered"
          isOpen={props.openModal}
          toggle={() => props.toggleModal()}
        >
          <div className="modal-header">
            <h5 className="modal-title">
              Items in Cart
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => props.toggleModal()}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
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
                  <th>
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  disDish.map((dish) => (
                    <tr key={dish.dishId}>
                      <th scope="row">
                        {dish.dishId}
                      </th>
                      <td>
                        {dish.name}
                      </td>
                      <td>
                        {dish.price}
                      </td>
                      <td>
                        {quantity[dish.dishId]}
                      </td>
                    </tr>
                  ))
                }
                <tr>
                  <th></th>
                  <td></td>
                  <td>Total Price: </td>
                  <td>{totalPrice}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="modal-footer">
            <Button
              color="success"
              data-dismiss="modal"
              type="button"
              onClick={() => props.placeOrder()}
            >
              Place Order
            </Button>
          </div>
        </Modal>
      </>
    );
  }
  else return null;
};

export default CartModal;

