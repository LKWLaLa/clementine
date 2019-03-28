import React from 'react'

class ItemTypeRow extends React.Component {
	render() {
		let price = this.props.currentPrice
		let privatePrice = this.props.privatePrice
		let detailSpan
		if (privatePrice) {
			detailSpan = <span>({this.props.currentPriceType} Pricing)</span>
		}
		else if (this.props.nextPriceType) {
			detailSpan = <span>{this.props.quantityRemainingAtCurrentPrice} remaining at {this.props.currentPriceType} pricing!</span>
		}

		price = isNaN(parseFloat(price)) ? price : '$' + price
		return (
			<tr className="item-type-row">
				<th>{this.props.itemTypeName}</th>
				<th>Price: {price}<div className="description">{this.props.itemTypeDescription}</div></th>
				<th>{detailSpan}</th>
			</tr>			
		)
	}
}

export default ItemTypeRow