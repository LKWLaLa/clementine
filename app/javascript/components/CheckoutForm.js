import React, {Component} from 'react';
import {injectStripe, CardElement} from 'react-stripe-elements';

class CheckoutForm extends Component {

  constructor(props){
    super(props);
    this.state = {complete: false};
  }


  handleSubmit = (e) => {
    e.preventDefault()
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'})
    .then(({token}) => {
      fetch('/api/charges', {
        method: "POST",
        headers: {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify({source: token.id}),
        credentials: 'same-origin'
      }).then(resp => resp.json())
      .then(resp => console.log(resp))
    })
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

