import React from 'react'
import ItemRow from './ItemRow.js'
import ItemTypeRow from './ItemTypeRow.js'
import {RecordCollection} from '../kinship/Kinship.js'

class PurchaseableItemsTable extends React.Component {
	constructor(props) {
		super(props)
	}

	enabled(item) {
		let s = this.props.status(item)
		return this.props.selectedItems.has(item)
			|| (!(s.ineligible || s.excluded || s.upgradeOnly || item.soldOut))
	}

	tipData(item) {
		let s = this.props.status(item)
		if (item.soldOut) {
			return {
				message: "This item is sold out!",
				limitingItems: null
			}
		}
		if (s.ineligible) {
			return {
				message: "requires one of the following:",
				limitingItems: s.qualifierItems
			}
		}
		if (s.excluded || s.upgradeOnly) {
			return {
				message: "unavailable because you have selected:",
				limitingItems: new RecordCollection([...(s.excluderItems || []),...(s.upgradeFromItems || [])])
			}
		}
		return {
			message: null,
			limitingItems: null
		}
	}
  
	render() {
		let rows = []
		for (let [itemType,items] of this.props.purchaseableItemsByType) {
			rows.push(<ItemTypeRow
				itemTypeName = {itemType.name}
				currentPrice = {itemType.currentPrice}
				quantityRemainingAtCurrentPrice = {itemType.quantityRemainingAtCurrentPrice}
				key = {'itemType ' + itemType.id}

			/>)
			for (let item of items) {
				let tipData = this.tipData(item)
				rows.push(
					<ItemRow
						item = {item}
						enabled={this.enabled(item)}
						selected = {this.props.selectedItems.has(item)}
						handleSelection = {this.props.handleSelection}
						message = {tipData.message}
						limitingItems = {tipData.limitingItems}
						key={item.id} />)
			}
		}

		return (
			<table>
				<thead>
					<tr>
						<th colSpan="3">
              				Items available for purchase
						</th>
					</tr>
					<tr>
						<th> </th>
						<th>Item</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		)
	}
}

export default PurchaseableItemsTable