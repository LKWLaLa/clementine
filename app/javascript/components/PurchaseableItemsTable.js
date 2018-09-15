import React, {Component} from 'react'
import ItemRow from './ItemRow.js'
import ItemTypeRow from './ItemTypeRow.js'

class PurchaseableItemsTable extends React.Component {
	// props should contain
	// itemTypes
	// purchaseableItemIds
	// enabledItemIds
	// selectedItemIds
	// handleSelection

	constructor(props) {
		super(props)
	}
  
	render() {
		let rows = []

		this.props.itemTypes.forEach((itemType) => {
			let items = itemType.items.filter(i => this.props.purchaseableItemIds.has(i.id))
			if (items.length > 0) {
				rows.push(<ItemTypeRow itemType = {itemType} key = {itemType.name}/>)
				items.forEach(item => {
					// debug
					console.log(item.id)
					console.log(this.props.selectedItemIds)
					rows.push(
						<ItemRow
							item={item}
							enabled={this.props.enabledItemIds.has(item.id)}
							selected = {this.props.selectedItemIds.has(item.id)}
							handleSelection = {this.props.handleSelection}
							key={item.id} />)
				})
			}
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