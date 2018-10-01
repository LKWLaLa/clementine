import React, {Component} from 'react';
import {injectStripe, CardElement} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      error: null,
      processingPayment: false
    }
  }


  handleSubmit(e) {
    this.setState({processingPayment: true})
    e.preventDefault()
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group (the CardElement).
    this.props.stripe.createToken({type: 'card', name: this.props.name})
    .then(({token}) => {
      let data = {
        source: token.id,
        amount: Math.round(this.props.amount * 100), // stripe requires cents
        description: this.props.description(),
        purchases: this.props.purchases,
        upgrades: this.props.upgrades
      }
      fetch('/api/sales', {
        method: "POST",
        headers: {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify(data), // will this work with getters?
        credentials: 'same-origin'
      }).then(resp => resp.json())
      .then(resp => {
        if (resp.ok) this.props.showTransactionComplete();
        if (resp.error) this.setState({
          error: resp.error,
          processingPayment: false
        });
      })
    })
  }

  

  render() {
    let submitButton;
    if (this.state.processingPayment) {
      submitButton = <span>processing payment</span>
    } else if (this.props.amount > 0) {
      submitButton = <button className="submit-button">Submit Payment</button>
    } else {
      submitButton = <button disabled={true}>Submit Payment</button>
    }

    return (
      <div className="checkout-form">
        <h3 className="amount">Total amount: ${this.props.amount}</h3>
        <form onSubmit={this.handleSubmit}>
          <CardElement style={{base: {fontSize: '15px'}}} /><br />
          <div id="card-errors" role="alert">{this.state.error}</div><br />
          {submitButton}
        </form>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm)

