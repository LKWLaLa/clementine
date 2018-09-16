import React, {Component} from 'react'
import ItemRow from './ItemRow.js'
import ItemTypeRow from './ItemTypeRow.js'

class PurchaseableItemsTable extends React.Component {
	constructor(props) {
		super(props)

		console.log(props)
	}
  
	render() {
		let rows = []

		this.props.purchaseableItemsByType.forEach((itemType) => {
			rows.push(<ItemTypeRow itemType = {itemType} key = {itemType.name}/>)
			itemType.items.forEach(item => {
				let status = this.props.status[item.id]
				rows.push(
					<ItemRow
						item={item}
						enabled={status.enabled}
						selected = {this.props.selectedItemIds.has(item.id)}
						handleSelection = {this.props.handleSelection}
						items={this.props.items}
						message = {status.enabled ? null : status.message}
						limitingItems = {status.limitingItems}
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