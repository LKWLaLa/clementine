import React from 'react'
import Autosuggest from 'react-autosuggest'

class BuyerPartnershipRow extends React.Component {
	constructor(props) {
		super(props)
		this.handlePartnerSubmission = this.handlePartnerSubmission.bind(this)
	}
	
	handlePartnerSubmission() {
		
	}

	render() {
		// const item = this.props.item
		// const partner = this.props.invitee
		const partnership = this.props.partnership
		const onPartnerSelected = this.props.onPartnerSelected

		return (
			<tr>
				<td>{partnership.item.name}</td>
				<td>{partnership.invitee.fullName}</td>
			</tr>
		)
	}
}

export default BuyerPartnershipRow