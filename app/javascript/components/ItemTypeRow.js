import React from 'react'

class ItemTypeRow extends React.Component {
	render() {
		const type = this.props.itemType
		return (
			<tr>
				<th colSpan="3">
					{type.name}
				</th>
			</tr>
		)
	}
}

export default ItemTypeRow