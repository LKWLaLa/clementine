import React from 'react'
import Autosuggest from 'react-autosuggest'
import {User} from '../helpers/models.js'
import Network from '../helpers/Network.js'

class BuyerPartnershipRow extends React.Component {
	constructor(props) {
		super(props)

		this.loadUsers()

		this.state = {
	      value: '',
	      suggestions: [],
	      editMode: !this.props.partnership.invitee
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
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;

		return inputLength === 0 ? [] : this.state.users.filter(user =>
			user.fullName.toLowerCase().slice(0, inputLength) === inputValue &&
			user.id != this.props.currentUser.id
		)
	}

	getSuggestionValue = (suggestion) => {
		return suggestion.fullName
	}

	renderSuggestion = (suggestion) => {
		return (
			<span>
				{suggestion.fullName}
			</span>
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

	// react-autosuggest
	onSuggestionSelected = (event, {
		suggestion,
		suggestionValue,
		suggestionIndex,
		sectionIndex,
		method }) => {
		this.setState({selection: suggestion})
	}
	
	confirmPartner = () => {
		if (this.props.partnership.sale) {
			let res =Network.patch_request(
				`api/partnerships/${this.props.partnership.id}`,
				{invitee_id: this.state.selection.id}
				)
			console.log(res)
		}
		this.props.handleInviteeChange(
			this.props.partnership.id,
			this.state.selection
			)
		this.leaveEditMode()
	}

	enterEditMode = () => {
		this.setState({editMode: true})
	}

	leaveEditMode = () => {
		this.setState({editMode: false})
	}

	cancelChange = () => {
		this.leaveEditMode()
	}

	render() {
		// const item = this.props.item
		// const partner = this.props.invitee
		const partnership = this.props.partnership
		const invitee = partnership.invitee
		const onPartnerSelected = this.props.onPartnerSelected

		// Autosuggest will pass through all these props to the input.
		const inputProps = {
			placeholder: 'Partner\'s name',
			value: this.state.value,
			onChange: this.onChange
		}


		let inviteeCell
		let cancelButton
		let actionButton
		if (this.state.editMode) {
			inviteeCell = <td><Autosuggest 
			          suggestions={this.state.suggestions}
			          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
			          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
			          getSuggestionValue={this.getSuggestionValue}
			          renderSuggestion={this.renderSuggestion}
			          inputProps={inputProps} 
			          shouldRenderSuggestions = {(v) => v.trim().length > 1}
			          renderSuggestionsContainer = {this.renderSuggestionsContainer}
			          onSuggestionSelected = {this.onSuggestionSelected}
			        /></td>
			actionButton = <span className="edit-partner-span" onClick={this.confirmPartner}>Confirm</span>
			cancelButton = <span className="edit-partner-span" onClick={this.cancelChange}>Cancel</span>
		} else {
			let actionLabel
			if (invitee) {
				inviteeCell = <td>{invitee.fullName}</td>
				actionLabel = 'Change'
			} else {
				inviteeCell = <td>tbd</td>
				actionLabel = 'Select partner'
			}
			actionButton = <span className="edit-partner-span" onClick={this.enterEditMode}>{actionLabel}</span>
			cancelButton = null
		}

		return (
			<tr className="partner-row">
				<td className="autosuggest-td">{partnership.item.name}</td>
				{inviteeCell}
				{actionButton}
				{cancelButton}
			</tr>
		)
	}
}

export default BuyerPartnershipRow