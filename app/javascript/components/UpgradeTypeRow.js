import React from 'react'

class UpgradeTypeRow extends React.Component {
	render() {
		const type = this.props.upgradeType
		return (
			<tr>
				<th colSpan="4">
					{type}
				</th>
			</tr>
		)
	}
}

export default UpgradeTypeRow