import React from 'react'

class PurchasedItemsTable extends React.Component {
	render() {
		const purchasedItems = this.props.purchasedItems
		const rows = purchasedItems.size > 0 ?
			[...purchasedItems].map(item => (
				<tr key={item.id}><td>{item.name}</td></tr>)) :
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