import React from 'react'

class InviteePartnershipRow extends React.Component {
	render() {
		const partnership = this.props.partnership

		return (
			<tr>
				<td>{partnership.item.name}</td>
				<td>{partnership.buyer.fullName}</td>
			</tr>
		)
	}
}

export default InviteePartnershipRow