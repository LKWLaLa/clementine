import React, {Component} from 'react';
import {injectStripe, CardElement} from 'react-stripe-elements';

class CheckoutForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    console.log("clicked")
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{margin: '0 60% 3% 0' }}>
        <CardElement style={{base: {fontSize: '18px'}}} /><br />
        <button>Confirm order</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm)

