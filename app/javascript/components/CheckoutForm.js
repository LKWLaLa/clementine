import React, {Component} from 'react';
import {injectStripe, CardElement} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      error: null
    }
  }


  handleSubmit(e) {
    e.preventDefault()
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group (the CardElement).
    this.props.stripe.createToken({type: 'card', name: this.props.name})
    .then(({token}) => {
      console.log(this.props.purchases)
      console.log(this.props.upgrades)
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
        console.log(this.props)
        if (resp.ok) this.props.showTransactionComplete();
        if (resp.error) this.setState({error: resp.error});
      })
    })
  }

  

  render() {
    return (
      <div>
        <h2>Amount : ${this.props.amount}</h2>
        <form onSubmit={this.handleSubmit} style={{margin: '0 40% 3% 0' }}>
          <CardElement style={{base: {fontSize: '18px'}}} /><br />
          <div id="card-errors" role="alert">{this.state.error}</div><br />
          <button>Submit Payment</button>
        </form>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm)

