import React, {Component} from 'react';
import {Elements} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';


class DashboardContainer extends Component {

  render(){
    return (
      <div className="dashboard-container">
        <h3>Checkout Form: </h3> 
          <Elements>
            <CheckoutForm />
          </Elements>
      </div>
    )
  }
}

export default DashboardContainer;
