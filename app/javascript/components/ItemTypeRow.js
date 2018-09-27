import React from 'react'

class ItemTypeRow extends React.Component {
	render() {
		return (
			<tr>
				<th colSpan="3">
					{this.props.itemTypeName}
				</th>
			</tr>
		)
	}
}

export default ItemTypeRow