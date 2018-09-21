import React, {Component} from 'react';
import {injectStripe, CardElement} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
    
    this.state = {complete: false}
  }


  handleSubmit(e) {
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
        body: JSON.stringify(data),
        credentials: 'same-origin'
      }).then(resp => resp.json())
      .then(resp => {
        if (resp.ok) this.setState({complete: true});
        if (resp.error) this.setState({error: resp.error});
      })
    })
  }

  

  render() {
    if (this.state.complete) return <h2>Purchase complete. Thanks for your registration!</h2>;
    
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

