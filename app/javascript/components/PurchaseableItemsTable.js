import React from 'react'
import ItemRow from './ItemRow.js'
import ItemTypeRow from './ItemTypeRow.js'

class PurchaseableItemsTable extends React.Component {
	constructor(props) {
		super(props)
	}

	enabled(itemId) {
		let s = this.props.status[itemId]
		return this.props.selectedItemIds.has(itemId)
			|| (!(s.ineligible || s.excluded || s.upgradeOnly || this.props.item[itemId].soldOut))
	}

	tipData(itemId) {
		let s = this.props.status[itemId]
		if (this.props.item[itemId].soldOut) {
			return {
				message: "This item is sold out!",
				limitingItems: null
			}
		}
		if (s.ineligible) {
			return {
				message: "requires one of the following:",
				limitingItems: s.qualifierItemIds
			}
		}
		if (s.excluded || s.upgradeOnly) {
			return {
				message: "unavailable because you have selected:",
				limitingItems: new Set([...(s.excluderItemIds || []),...(s.upgradeFromItemIds || [])])
			}
		}
		return {
			message: null,
			limitingItems: null
		}
	}
  
	render() {
		let rows = []

		this.props.purchaseableItemsByType.forEach((itemType) => {
			rows.push(<ItemTypeRow itemType = {itemType} key = {itemType.name}/>)
			itemType.items.forEach(item => {
				let tipData = this.tipData(item.id)
				rows.push(
					<ItemRow
						itemId = {item.id}
						item={this.props.item}
						enabled={this.enabled(item.id)}
						selected = {this.props.selectedItemIds.has(item.id)}
						handleSelection = {this.props.handleSelection}
						message = {tipData.message}
						limitingItems = {tipData.limitingItems}
						key={item.id} />)
			})
		})

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