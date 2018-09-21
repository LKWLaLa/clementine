import React from 'react'

class PurchasedItemsTable extends React.Component {
	render() {
		const purchasedItemIds = this.props.purchasedItemIds
		const rows = purchasedItemIds.size > 0 ?
			[...purchasedItemIds].map(itemId => (
				<tr key={itemId}><td>{this.props.item[itemId].name}</td></tr>)) :
			<tr><td>You have not purchased any items yet</td></tr>
		return (
			<table>
				<thead>
					<tr>
					<th colSpan="1">Purchased Items</th>
					</tr>
					<tr>
						<th>Item</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		)
	}	
}

export default PurchasedItemsTable