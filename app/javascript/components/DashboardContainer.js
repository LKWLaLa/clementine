import React, {Component} from 'react';
import {Elements} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';


class DashboardContainer extends Component {

  render(){
    return (
      <div className="dashboard-container">
        <h2>Welcome to your registration dashboard, {this.props.name}! </h2>
        <h3>Checkout: </h3> 
          <Elements>
            <CheckoutForm name={this.props.name}/>
          </Elements>
      </div>
    )
  }
}

export default DashboardContainer;
