import React from 'react'

class ItemTypeRow extends React.Component {
	render() {
		let price = this.props.currentPrice
		price = isNaN(parseFloat(price)) ? price : '$' + price
		return (
			<tr>
				<th>{this.props.itemTypeName}</th>
				<th>Price: {price}</th>
				<th>{this.props.quantityRemainingAtCurrentPrice} remaining at this price!</th>
			</tr>
		)
	}
}

export default ItemTypeRow