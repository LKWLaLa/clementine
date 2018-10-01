import React from 'react'

class ItemTypeRow extends React.Component {
	render() {
		return (
			<tr className="column-header">
				<th colSpan="3">
					{this.props.itemTypeName}
				</th>
			</tr>
		)
	}
}

export default ItemTypeRow