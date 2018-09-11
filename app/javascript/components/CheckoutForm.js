import React, {Component} from 'react';
import {injectStripe, CardElement} from 'react-stripe-elements';

class CheckoutForm extends Component {

  constructor(props){
    super(props);

    //amount must be in cents, not dollars
    this.state = {
      amount: 1000,
      description: 'Full Pass Follower',
      complete: false,
      error: ''
    };
  }


  handleSubmit = (e) => {
    e.preventDefault()
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group (the CardElement).
    this.props.stripe.createToken({type: 'card', name: this.props.name})
    .then(({token}) => {
      let data = {
        source: token.id,
        amount: this.state.amount,
        description: this.state.description
      }
      fetch('/api/charges', {
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
      <form onSubmit={this.handleSubmit} style={{margin: '0 40% 3% 0' }}>
        <CardElement style={{base: {fontSize: '18px'}}} /><br />
        <div id="card-errors" role="alert">{this.state.error}</div><br />
        <button>Submit Payment</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm)

