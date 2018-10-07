import React from 'react'

class ItemTypeRow extends React.Component {
	render() {
		let price = this.props.currentPrice 
		let quantityRemainingSpan = this.props.nextPriceType ?
			<span>{this.props.quantityRemainingAtCurrentPrice} remaining at {this.props.currentPriceType} pricing!</span> : null

		price = isNaN(parseFloat(price)) ? price : '$' + price
		return (
			<tr className="item-type-row">
				<th>{this.props.itemTypeName}</th>
				<th>Price: {price}<div className="description">{this.props.itemTypeDescription}</div></th>
				<th>{quantityRemainingSpan}</th>
			</tr>			
		)
	}
}

export default ItemTypeRow