import React from 'react';
// reactstrap components
import {
  Button,
  Modal,
  Table,
} from 'reactstrap';

class OrderModal extends React.Component {
  render() {
    if (this.props.data) {
      const { dishes } = this.props.data;

      const quantity = {};
      const disDish = [];
      dishes.forEach((dish) => {
        if (quantity[dish.dishId]) quantity[dish.dishId]++;
        else {
          disDish.push(dish);
          quantity[dish.dishId] = 1;
        }
      });

      return (
        <>
          <Modal
            className="modal-dialog-centered"
            isOpen={this.props.openModal}
            toggle={() => this.props.toggleModal()}
          >
            <div className="modal-header">
              <h5 className="modal-title">
                Order ID: {this.props.data.orderId}
              </h5>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => this.props.toggleModal()}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <h5>Dish List</h5>
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
                </tbody>
              </Table>
            </div>
            <div className="modal-footer">
              <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={() => this.props.toggleModal()}
              >
                Close
              </Button>
            </div>
          </Modal>
        </>
      );
    }
    else return null;
  }
}

export default OrderModal;