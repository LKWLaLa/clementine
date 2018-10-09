import React from 'react'
import Autosuggest from 'react-autosuggest'
import {User} from '../helpers/models.js'
import Network from '../helpers/Network.js'

class BuyerPartnershipRow extends React.Component {
	constructor(props) {
		super(props)
		this.handlePartnerSubmission = this.handlePartnerSubmission.bind(this)

		this.loadUsers()

		this.state = {
	      value: '',
	      suggestions: []
	    }
	}

	loadUsers = () => {
		Network.json_get('api/users')
			.then(res => {
				this.setState({
					users: res
				})
			})
	}

	getSuggestions = (value) => {
		console.log('getting suggestions')
		console.log(this.state.users)

		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;

		return inputLength === 0 ? [] : this.state.users.filter(user =>
			user.fullName.toLowerCase().slice(0, inputLength) === inputValue
		)
	}

	getSuggestionValue = (suggestion) => {
		return suggestion.fullName
	}

	renderSuggestion = (suggestion) => {
		return (
			<div>
				{suggestion.fullName}
			</div>
		)
	}

	onChange = (event, { newValue }) => {
		this.setState({
		  value: newValue
		})
	}

	// Autosuggest will call this function every time you need to update suggestions.
	// You already implemented this logic above, so just use it.
	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
		  suggestions: this.getSuggestions(value)
		})
	}

	// Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested = () => {
		this.setState({
		  suggestions: []
		})
	}
	
	handlePartnerSubmission() {
		
	}

	render() {
		// const item = this.props.item
		// const partner = this.props.invitee
		const partnership = this.props.partnership
		const onPartnerSelected = this.props.onPartnerSelected

		// Autosuggest will pass through all these props to the input.
		const inputProps = {
			placeholder: 'Type partner\'s name',
			value: this.state.value,
			onChange: this.onChange
		}

		return (
			<tr>
				<td>{partnership.item.name}</td>
				<td>
					<Autosuggest 
			          suggestions={this.state.suggestions}
			          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
			          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
			          getSuggestionValue={this.getSuggestionValue}
			          renderSuggestion={this.renderSuggestion}
			          inputProps={inputProps} 
			          shouldRenderSuggestions = {(v) => v.trim().length > 1}
			          renderSuggestionsContainer = {this.renderSuggestionsContainer}
			          onSuggestionSelected = {this.onSuggestionSelected}
			        />
				</td>
			</tr>
		)
	}
}

export default BuyerPartnershipRow